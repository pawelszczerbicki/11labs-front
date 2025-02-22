import {Routes} from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/compat/auth-guard';
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {EmptyComponent} from "./empty/empty.component";
import {LoginComponent} from "./auth/login/login.component";
import {ErrorComponent} from "./auth/error/error.component";
import {CallbackComponent} from "./auth/callback/callback.component";
import {SendComponent} from "./auth/send/send.component";
import {StartComponent} from "./start/start.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: '', component: EmptyComponent, children: [
      {path: '', component: StartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'login/error', component: ErrorComponent},
      {path: 'login/callback', component: CallbackComponent},
      {path: 'login/send', component: SendComponent},]
  },
  {
    path: '',
    component: EmptyComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin},
    children: [
      {path: 'start', component: StartComponent},
    ]
  },
  {
    path: '', component: EmptyComponent, children: [
      {path: '', component: StartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'login/error', component: ErrorComponent},
      {path: 'login/callback', component: CallbackComponent},
      {path: 'login/send', component: SendComponent},]
  }

];
