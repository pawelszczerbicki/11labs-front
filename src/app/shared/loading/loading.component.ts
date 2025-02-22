import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-loading',
    imports: [NgClass],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.css'
})
export class LoadingComponent {
  @Input() small?: boolean
}
