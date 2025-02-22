import {Component, inject, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Input() confirmFn?: Function
  @Input() text?: string
  @Input() cancelText?: string
  @Input() confirmText?: string

  activeModal = inject(NgbActiveModal);

  confirm = () => {
    if (this.confirmFn) this.confirmFn();
    this.activeModal.dismiss()
  }

}
