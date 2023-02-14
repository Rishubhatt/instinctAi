import {
  Directive,
  Input,
  Renderer2,
  OnChanges,
  Inject,
  ElementRef,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Directive({
  selector: "[buttonLoader]",
})
export class ButtonLoaderDirective implements OnChanges {
  @Input() buttonLoader = true;
  constructor(private elementref: ElementRef, private renderer: Renderer2) {}
  ngOnChanges(): void {
    console.log(this.elementref);
    if (this.buttonLoader) {
      this.renderer.addClass(this.elementref.nativeElement, "spinner");
    } else {
      this.renderer.addClass(this.elementref.nativeElement, "remove_spinner");
      setTimeout(() => {
        this.renderer.removeClass(this.elementref.nativeElement, "spinner");
        this.renderer.removeClass(
          this.elementref.nativeElement,
          "remove_spinner"
        );
      }, 700);
    }
  }
}
