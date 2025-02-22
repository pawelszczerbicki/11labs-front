import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommandModule} from "@angular/cli/src/command-builder/command-module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-start',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  surveyForm: FormGroup;
  step = 1;

  lessons = ['Courage', 'Thriftiness', 'Patience', 'Diligence', 'Honesty', 'Kindness', 'Humility', 'Self-discipline', 'Perseverance', 'Empathy'];
  ages = Array.from({length: 11}, (_, i) => i + 5);
  elements = ['Castles', 'Princesses', 'Dragons', 'Unicorns', 'Pirates', 'Robots', 'Dinosaurs', 'Space', 'Elves', 'Knights'];

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      lesson: [''],
      age: [''],
      elements: [[]],
      childName: ['']
    });
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  submitForm(): void {
    console.log(this.surveyForm.value);
  }

  toggleElement(element: string): void {
    const elements = this.surveyForm.value.elements as string[];
    if (elements.includes(element)) {
      this.surveyForm.patchValue({elements: elements.filter(e => e !== element)});
    } else {
      this.surveyForm.patchValue({elements: [...elements, element]});
    }
  }

}
