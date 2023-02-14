import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      #ripple
      [ngClass]="{
        btn: true,
        'btn-sm': size == 'sm',
        'btn-lg': size == 'lg',
        'p-btn-bg-white': type == 1,
        'p-btn-bg-white-disabled': type == 1 && disabled,
        'p-btn-bg-yellow': type == 2,
        'p-btn-bg-yellow-disabled': type == 2 && disabled,
        's-btn': type == 3,
        's-btn-disabled': type == 3 && disabled,
        'loading-dots': dotLoader == 'loading-dots'
      }"
      (click)="onCLick($event)"
      [ngStyle]="btnStyle"
      queryParamsHandling="preserve"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  /*
  TYPE:

    1 => Primary Button on White/Image
    2 => Primary Button on Yellow
    3 => Secondary Button on White
  */

  /*
  SIZE:
    small: -> sm
    large -> lg
    default: -> default
  */
  @ViewChild('ripple') ripple: any;
  @Input() type = 1;
  @Input() size = 'default';
  @Input() disabled = false;
  @Input() btnStyle = {};
  @Input() preventDefault = true;
  @Input() stopPropagation = true;
  @Input() link = '';
  @Input() dotLoader: any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private rederer: Renderer2) {}

  onCLick($event: any) {
    $event.preventDefault();
    this.rederer.addClass($event.target, 'is-active');
    setTimeout(() => {
      this.rederer.removeClass($event.target, 'is-active');
    }, 500);
    this.onClick.emit(true);
  }
  ngOnChanges() {}
}
