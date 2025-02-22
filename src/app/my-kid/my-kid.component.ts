import { HttpClient } from '@angular/common/http';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {finalize, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-kid',
  imports: [ReactiveFormsModule],
  templateUrl: './my-kid.component.html',
  styleUrl: './my-kid.component.css'
})
export class MyKidComponent {
  kidForm = new FormGroup({
    name: new FormControl(),
    age: new FormControl()
  })
  saving = false
  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.http.get<any>("/kid").subscribe(k=>{
      if(k.length == 0) return
      this.kidForm.patchValue(k[0])
    })
  }
  save = () => {
    this.saving = true
    this.http.post("/kid", this.kidForm.value).pipe(tap(() => this.toastr.success("Saved")), finalize(() => this.saving = false))
      .subscribe();
  }

}
