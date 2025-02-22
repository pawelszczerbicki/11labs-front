import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: true,
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.css'
})
export class NoDataComponent {
  @Input() text?: string;
}
