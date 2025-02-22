import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDragdrop]',
  standalone: true
})
export class DragdropDirective {

  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
