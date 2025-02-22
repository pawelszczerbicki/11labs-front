import {Routes} from '@angular/router';
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {EmptyComponent} from "./empty/empty.component";
import {SelectPanelComponent} from "./select-panel/select-panel.component";
import {MainComponent} from "./main/main.component";
import {StartComponent} from "./start/start.component";
import {StoryComponent} from "./story/story.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: '', component: EmptyComponent, children: [
      // {path: '', component: SelectPanelComponent},
      {path: '', component: StartComponent},
      {path: 'story', component: StoryComponent},
    ]
  },
  {
    path: '', component: MainComponent, children: [
      {path: '', component: SelectPanelComponent},
      // {path: 'some', component: StartComponent},
      // {path: 'story', component: StoryComponent},
    ]
  },
];
