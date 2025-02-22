import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
    selector: 'app-autocomplete',
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  @Input() lineTemplate: TemplateRef<any> | null = null
  @Input({required: true}) items!: any[]
  @Input() selected!: any
  @Input() label: string | undefined
  @Input() readonly: boolean = true
  @Input() type: string = "text"
  @Input() formatter?: (a: any) => string
  @Output() onSelected = new EventEmitter<any>()
  @Output() onChange = new EventEmitter<any>()
}
