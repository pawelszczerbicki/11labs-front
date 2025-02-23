import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {finalize, tap} from 'rxjs';
import {LoadingComponent} from '../shared/loading/loading.component';

@Component({
  selector: 'app-start',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, LoadingComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  surveyForm: FormGroup;
  step = 1;
  saving = false;

  lessons = [
    {name: 'Courage', emoji: '🦁'},
    {name: 'Thriftiness', emoji: '💰'},
    {name: 'Patience', emoji: '🧘'},
    {name: 'Diligence', emoji: '🎯'},
    {name: 'Honesty', emoji: '🤝'},
    {name: 'Kindness', emoji: '💝'},
    {name: 'Humility', emoji: '🙏'},
    {name: 'Self-discipline', emoji: '💪'},
    {name: 'Perseverance', emoji: '🏃'},
    {name: 'Empathy', emoji: '❤️'},
    {name: 'Responsibility', emoji: '✅'},
    {name: 'Gratitude', emoji: '🙌'},
    {name: 'Respect', emoji: '🌟'},
    {name: 'Creativity', emoji: '🎨'},
    {name: 'Teamwork', emoji: '👥'},
    {name: 'Generosity', emoji: '🎁'},
    {name: 'Forgiveness', emoji: '🕊️'},
    {name: 'Optimism', emoji: '☀️'},
    {name: 'Open-mindedness', emoji: '🧠'},
    {name: 'Graciousness', emoji: '👑'},
  ];
  ages = Array.from({length: 13}, (_, i) => i + 3);
  elements = [
    {name: 'Castles', emoji: '🏰'},
    {name: 'Princesses', emoji: '👸'},
    {name: 'Dragons', emoji: '🐉'},
    {name: 'Unicorns', emoji: '🦄'},
    {name: 'Pirates', emoji: '🏴‍☠️'},
    {name: 'Robots', emoji: '🤖'},
    {name: 'Dinosaurs', emoji: '🦖'},
    {name: 'Space', emoji: '🌌'},
    {name: 'Knights', emoji: '⚔️'},
    {name: 'Wizards', emoji: '🧙'},
    {name: 'Fairies', emoji: '🧚'},
    {name: 'Magic', emoji: '✨'},
    {name: 'Adventure', emoji: '🗺️'},
    {name: 'Heroes', emoji: '🦸'},
    {name: 'Aliens', emoji: '👽'},
    {name: 'Spacecraft', emoji: '🚀'},
    {name: 'LEGO', emoji: '🧱'},
    {name: 'Police', emoji: '🚔'},
    {name: 'Democracy', emoji: '🏛️'},
    {name: 'Huggy Wuggy', emoji: '🧸'},
  ];

  voices = [
    {id: 'tqA6i6KHhXNOU8bqdxNY', name: 'Winnie-the-Pooh'},
    {id: 'pQVwW8uwbObGejdyhYiQ', name: 'Rapunzel'},
    {id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel'},
    {id: 'nPczCjzI2devNBz1zQrb', name: 'Brian'}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toast: ToastrService
  ) {
    this.surveyForm = this.fb.group({
      name: [''],
      lesson: [''],
      elements: [[]],
      customElement: [''],
      voice: ['']
    });
  }

  selectVoice(voice: string) {
    this.surveyForm.get('voice')?.setValue(voice);
  }

  save = () => {
    if (this.surveyForm.value.customElement)
      this.surveyForm.value.elements.push(this.surveyForm.value.customElement);
    this.saving = true;
    this.http.post('/story', this.surveyForm.value)
      .pipe(
        tap(() => this.toast.success('Story added')),
        finalize(() => (this.saving = false))
      )
      .subscribe(() => this.router.navigate(['/parent']));
  };

  toggleElement(element: string): void {
    const elements = this.surveyForm.value.elements as string[];
    if (elements.includes(element)) {
      this.surveyForm.patchValue({
        elements: elements.filter((e) => e !== element),
      });
    } else {
      this.surveyForm.patchValue({elements: [...elements, element]});
    }
  }
}
