import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Kid } from './kid';
import { forkJoin, switchMap, tap } from 'rxjs';
import { Story } from '../story/story';
import { MusicBarsComponent } from '../music-bars/music-bars.component';
import { StoryTextResponse } from './tale';
import { KidLoaderComponent } from '../shared/kid-loader/kid-loader.component';

@Component({
  selector: 'app-kid-story',
  imports: [KidLoaderComponent, MusicBarsComponent, RouterModule],
  templateUrl: './kid-story.component.html',
  styleUrl: './kid-story.component.css',
})
export class KidStoryComponent implements OnInit {
  splitEmojisAndText(text: string): {
    emojis: string[];
    remainingText: string;
  } {
    const regex = /^([\p{Emoji}\u200d]+[\p{Emoji}\u200d]+)/u;
    const match = text.match(regex);
    if (match) {
      const emojis = Array.from(match[1].match(/\p{Emoji}\u200d*/gu) || []);
      return {
        emojis: emojis.slice(0, 2),
        remainingText: text.slice(match[1].length).trim(),
      };
    }
    return { emojis: [], remainingText: text };
  }

  kid?: Kid;
  story?: Story;
  generatedStory?: StoryTextResponse;
  storyHistory: string[] = [];
  storyTextToDisplay?: string;
  audio?: HTMLAudioElement;
  loading = false;
  generatingAudio = false;
  generatedImage?: string;
  intervalId?: any;
  loadingStory = false;
  step = 1;
  audioLoaded = false;
  showOptions = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadingStory = true;
    this.http
      .get<Kid[]>('/kid')
      .pipe(
        tap((k) => (this.kid = k[0])),
        switchMap(() =>
          this.http
            .get<Story>('/story/' + this.route.snapshot.params['id'])
            .pipe(tap((s) => (this.story = s)))
        ),
        switchMap(() => this.generateText()),
        switchMap((s) => forkJoin([
          this.generateAudio().pipe(tap(x => this.animateText(s.story))),
          this.generateImage()]
        )),
        tap(() => (this.loadingStory = false))
      )
      .subscribe();
  }

  generateImage = () =>
    this.http
      .post<any>('/story/image', { text: this.generatedStory?.story })
      .pipe(tap((s) => (this.generatedImage = s.url)));

  choose = (o: string) => {
    this.storyTextToDisplay = '';
    this.audioLoaded = false;
    this.loadingStory = true;
    this.showOptions = false;
    if (this.intervalId) clearInterval(this.intervalId);
    this.generateText(o)
      .pipe(switchMap(s => forkJoin([
          this.generateAudio().pipe(tap(x => this.animateText(s.story))),
          this.generateImage()
        ])),
        tap(() => this.loadingStory = false))
      .subscribe()
  }

  generateText = (selected?: string) =>
    this.http
      .post<StoryTextResponse>('/story/text', {
        step: ++this.step,
        name: this.kid?.name,
        age: this.kid?.age,
        selectedOption: selected,
        lesson: this.story?.lesson,
        elements: this.story?.elements,
        storyHistory: this.storyHistory,
      })
      .pipe(
        tap((s) => (this.generatedStory = s)),
        tap((s) => this.storyHistory.push(s.story))
      );

  generateAudio = () => {
    this.generatingAudio = true;
    this.audioLoaded = false
    return this.http.post("/story/audio", {text: this.generatedStory?.story, voice: this.story?.voice}, {responseType: 'blob'})
      .pipe(tap((audioBlob: Blob) => {
        this.audio = new Audio(URL.createObjectURL(audioBlob))  // Otrzymujemy referencję do elementu audio
        this.audio!.load();  // Ładujemy audio
        this.audio!.play()
        this.audio.addEventListener('ended', () => this.showOptions = true)
        this.generatingAudio = false;
        this.audioLoaded = true;
      }));
  }

  animateText(s: string) {
    let index = 0;
    const textLength = s.length;
    this.storyTextToDisplay = '';
    this.intervalId = setInterval(() => {
      this.storyTextToDisplay += s[index];
      index++;
      if (index === textLength) {
        clearInterval(this.intervalId); // Zatrzymujemy animację po napisaniu całego tekstu
      }
    }, 40); // 100ms między literami
  }

  stopAnimation = () => clearInterval(this.intervalId);
}
