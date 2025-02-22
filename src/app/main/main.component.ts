import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";

const theme = 'theme'

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  constructor(private auth: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    if (this.isDark()) this.darkMode()
  }


  darkMode = () => {
    localStorage.setItem(theme, 'dark');
    document.body.setAttribute("data-bs-theme", "dark")
  }

  lightMode = () => {
    localStorage.removeItem(theme)
    document.body.setAttribute("data-bs-theme", "")
  }

  isDark = () => !!localStorage.getItem(theme)
  logout = () => this.auth.logout();
}
