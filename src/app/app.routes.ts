import {Routes} from '@angular/router';
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {EmptyComponent} from "./empty/empty.component";
import {LoginComponent} from "./auth/login/login.component";
import {StartComponent} from "./start/start.component";
import {StoryComponent} from "./story/story.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: '', component: EmptyComponent, children: [
      {path: '', component: StartComponent},
      {path: 'story', component: StoryComponent},
    ]
  }
];
