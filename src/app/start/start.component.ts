import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-start',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  surveyForm: FormGroup;
  step = 1;

  lessons = ['Courage', 'Thriftiness', 'Patience', 'Diligence', 'Honesty', 'Kindness', 'Humility', 'Self-discipline', 'Perseverance', 'Empathy'];
  ages = Array.from({length: 11}, (_, i) => i + 5);
  elements = ['Castles', 'Princesses', 'Dragons', 'Unicorns', 'Pirates', 'Robots', 'Dinosaurs', 'Space', 'Elves', 'Knights'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.surveyForm = this.fb.group({
      lesson: [''],
      age: [''],
      elements: [[]],
      name: ['']
    });
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  navigate = () => this.router.navigate(["story"], {state: this.surveyForm.value});

  toggleElement(element: string): void {
    const elements = this.surveyForm.value.elements as string[];
    if (elements.includes(element)) {
      this.surveyForm.patchValue({elements: elements.filter(e => e !== element)});
    } else {
      this.surveyForm.patchValue({elements: [...elements, element]});
    }
  }
}
