import {
  Directive,
  Input,
  Renderer2,
  OnChanges,
  Inject,
  ElementRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appLoader]',
})
export class LoaderDirective implements OnChanges {
  @Input() appLoader: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.appLoader) {
      // console.log(this.elementRef.nativeElement)
      // console.log('when true')
      this.renderer.addClass(this.elementRef.nativeElement, 'loader');
    } else {
      // console.log(this.elementRef.nativeElement)
      // console.log('when false')
      this.renderer.removeClass(this.elementRef.nativeElement, 'loader');
      setTimeout(() => {
        this.renderer.removeClass(this.elementRef.nativeElement, 'loader');
        this.renderer.removeClass(this.elementRef.nativeElement, 'animator');
      }, 700);
    }
  }
}
