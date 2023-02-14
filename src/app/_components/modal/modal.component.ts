import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input()
  title: any;
  @Input()
  contentTpl: any;
  @Input()
  text: any;
  @Input()
  closeIsAbled: any;

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {}

  close(event: any) {
    this.closeModal.emit(event);
  }
}
