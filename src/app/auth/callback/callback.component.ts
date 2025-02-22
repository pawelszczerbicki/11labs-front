import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoadingComponent} from "../../shared/loading/loading.component";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-callback',
    imports: [
        RouterLink,
        LoadingComponent
    ],
    templateUrl: './callback.component.html',
    styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  longLoading = false;
  enableEmailForm = false;
  submittedEmail = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.isLoginWithLink()
      .then(isLink => isLink ? this.loginWithLink() : this.router.navigate(['/login/error']))
      .catch(() => this.router.navigate(['/login/error']));
  }

  submitEmail(value: string) {
    this.submittedEmail = true;
    this.auth.loginWithLink(value)
      .then(this.handleSuccess)
      .catch(() => this.router.navigate(['/login/error']))
      .finally(() => this.submittedEmail = false);
  }

  private handleSuccess = () => this.router.navigate([''])

  private loginWithLink = () => {
    setTimeout(() => this.longLoading = true, 15000);
    if (this.auth.linkEmailExists()) {
      return this.auth.loginWithLink().then(this.handleSuccess);
    }
    this.enableEmailForm = true;
    return;
  };
}
