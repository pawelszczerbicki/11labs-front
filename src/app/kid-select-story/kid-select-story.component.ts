import { Component } from '@angular/core';
import {Story} from "../stories/story";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs";
import {RouterModule} from "@angular/router";
import {LoadingComponent} from "../shared/loading/loading.component";

@Component({
  selector: 'app-kid-select-story',
  imports: [RouterModule, LoadingComponent],
  templateUrl: './kid-select-story.component.html',
  styleUrl: './kid-select-story.component.css'
})
export class KidSelectStoryComponent {
  stories?: Story[];
  loading = true

  constructor(private http: HttpClient, private toast: ToastrService) {
    this.http.get<Story[]>('/story').pipe(finalize(() => this.loading = false)).subscribe(s => this.stories = s);
  }
}
