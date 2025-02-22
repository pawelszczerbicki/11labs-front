import {Component, Input} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "../confirmation/confirmation.component";

@Component({
  selector: 'app-remove-button',
  imports: [],
  templateUrl: './remove-button.component.html',
  styleUrl: './remove-button.component.css'
})
export class RemoveButtonComponent {
  @Input({required: true}) remove!: Function

  constructor(private modalService: NgbModal) {
  }

  openConfirmationModal = () => {
    this.modalService.open(ConfirmationComponent).componentInstance.confirmFn = this.remove
  }
}
