import {Routes} from '@angular/router';
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {EmptyComponent} from "./empty/empty.component";
import {SelectPanelComponent} from "./select-panel/select-panel.component";
import {MainComponent} from "./main/main.component";
import {StoriesComponent} from "./stories/stories.component";
import {StartComponent} from "./start/start.component";
import {MyKidComponent} from "./my-kid/my-kid.component";
import {KidSelectStoryComponent} from "./kid-select-story/kid-select-story.component";
import {KidStoryComponent} from "./kid-story/kid-story.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  {
    path: 'parent', component: MainComponent, children: [
      {path: '', component: StoriesComponent},
      {path: 'kid', component: MyKidComponent},
      {path: 'story/create', component: StartComponent},
      // {path: 'some', component: StartComponent},
      // {path: 'story', component: StoryComponent},
    ]
  },
  {
    path: 'kid', component: EmptyComponent, children: [
      {path: '', component: KidSelectStoryComponent},
      // {path: 'some', component: StartComponent},
      // {path: 'story', component: StoryComponent},
    ]
  },
  {path: 'kid/story/:id', component: KidStoryComponent},
  {
    path: '', component: EmptyComponent, children: [
      {path: '', component: SelectPanelComponent},
      // {path: '', component: StartComponent},
      // {path: 'story', component: StoryComponent},
    ]
  },
];
