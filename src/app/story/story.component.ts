import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoadingComponent} from "../shared/loading/loading.component";
import {Story} from './story';

@Component({
  selector: 'app-story',
  imports: [LoadingComponent],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayerRef?: ElementRef;
  audio?: HTMLAudioElement;
  loading = false;
  story: Story;

  constructor(private http: HttpClient, private router: Router) {
    this.story = this.router.getCurrentNavigation()?.extras?.state as Story;
    if(!this.story) this.router.navigate(["/"]);
  }

  ngOnInit() {
    this.loading = true;

    this.http.post("https://labs-backend.lm.r.appspot.com/story", this.story, {responseType: 'blob'})
      .subscribe((audioBlob: Blob) => {
        const audioUrl = URL.createObjectURL(audioBlob);  // Tworzymy URL z otrzymanego strumienia
        this.audio = this.audioPlayerRef?.nativeElement;  // Otrzymujemy referencję do elementu audio
        this.audio!.src = audioUrl;  // Ustawiamy źródło audio
        this.audio!.load();  // Ładujemy audio
        this.audio!.play();  // Rozpoczynamy odtwarzanie
        this.loading = false;
      });
  }
}
