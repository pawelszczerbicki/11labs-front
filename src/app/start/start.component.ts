import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {finalize, tap} from "rxjs";
import {LoadingComponent} from "../shared/loading/loading.component";

@Component({
  selector: 'app-start',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, LoadingComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  surveyForm: FormGroup;
  step = 1;
  saving = false
  lessons = ['Courage', 'Thriftiness', 'Patience', 'Diligence', 'Honesty', 'Kindness', 'Humility', 'Self-discipline', 'Perseverance', 'Empathy'];
  ages = Array.from({length: 11}, (_, i) => i + 5);
  elements = ['Castles', 'Princesses', 'Dragons', 'Unicorns', 'Pirates', 'Robots', 'Dinosaurs', 'Space', 'Elves', 'Knights'];

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private toast: ToastrService) {
    this.surveyForm = this.fb.group({
      name: [''],
      lesson: [''],
      elements: [[]],
    });
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  save = () => {
    this.saving = true
    this.http.post("/story", this.surveyForm.value).pipe(tap(() => this.toast.success("Story added")), finalize(() => this.saving = false))
      .subscribe(()=>this.router.navigate(["/parent"]));
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
