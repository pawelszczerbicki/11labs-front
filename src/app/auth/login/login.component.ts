import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoadingComponent} from "../../shared/loading/loading.component";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading: boolean = false;
  userForm = new FormGroup({email: new FormControl('', [Validators.required, Validators.email])});

  constructor(private auth: AuthService, private router: Router) {
  }

  magicLink = () => {
    this.isLoading = true
    this.auth.sendLink(this.userForm.value.email as string)
      .then(() => this.router.navigate(['login/send']))
      .catch(() => this.router.navigate(["login/error"]))
      .finally(() => this.isLoading = false)
  }

  google = () => {
    this.isLoading = true
    this.auth.googlePopup()
      .then(() => this.router.navigate(["/company/change"]))
      .catch(() => this.router.navigate(["login/error"]))
      .finally(() => this.isLoading = false)
  }
}
