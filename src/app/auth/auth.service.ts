import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {HttpClient} from "@angular/common/http";

export const EMAIL_KEY = "login_email"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
  }

  sendLink = (email: string) => this.afAuth.sendSignInLinkToEmail(email as string, {
    url: `${window.location.origin}/login/callback`,
    handleCodeInApp: true
  }).then(() => localStorage.setItem(EMAIL_KEY, email))

  googlePopup = () => this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(r => {
      if (!r.user) throw new Error("no user")
      // return firstValueFrom(this.http.get<Company[]>("/company/my")).then(this.reloadToken)
    })

  isLoginWithLink = () => this.afAuth.isSignInWithEmailLink(window.location.href);
  loginWithLink = (email?: string) => this.afAuth.signInWithEmailLink(email || localStorage.getItem(EMAIL_KEY) as string, window.location.href).then(() => localStorage.removeItem(EMAIL_KEY));
  linkEmailExists = () => !!localStorage.getItem(EMAIL_KEY)
  logout = () => this.afAuth.signOut()
  getToken = () => this.afAuth.idTokenResult
  getTokenPromise = () => this.afAuth.currentUser.then(u => u?.getIdToken());
  reloadToken = async () => await this.afAuth.currentUser.then(u => u?.getIdToken(true)).then(console.log)
}
