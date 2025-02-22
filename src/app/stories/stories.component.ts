import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Story} from "./story";
import {NoDataComponent} from "../shared/no-data/no-data.component";
import {RouterModule} from "@angular/router";
import {finalize} from "rxjs";
import {LoadingComponent} from "../shared/loading/loading.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-stories',
  imports: [NoDataComponent, RouterModule, LoadingComponent],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent {
  stories?: Story[];
  loading = true

  constructor(private http: HttpClient, private toast: ToastrService) {
    this.http.get<Story[]>('/story').pipe(finalize(() => this.loading = false)).subscribe(s => this.stories = s);
  }

  delete = (id?: string) => this.http.delete('/story/' + id).subscribe(() => {
    this.toast.success('Story deleted successfully.');
    this.http.get<Story[]>('/story').pipe(finalize(() => this.loading = false)).subscribe(s => this.stories = s);
  });
}
