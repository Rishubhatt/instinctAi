import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '.ripple-effect',
})
export class RippleDirective {
  ripple = document.createElement('div');

  constructor(private element: ElementRef, private renderer: Renderer2) {
    // this.ripple.setAttribute('class', 'effect');
    // console.log(this.element.nativeElement)
    // this.renderer.appendChild(this.element.nativeElement, this.ripple);
    //     const buttons:any = document.getElementsByTagName("a");
    // for (const button of buttons) {
    //   button.addEventListener("click", this.createRipple);
    // }
  }

  // Click state ripples
  @HostListener('click', ['$event']) onClick($event: any) {
    console.info($event);
    this.createRipple($event);
  }

  createRipple(event: any) {
    // console.log(this.element.nativeElement.clientHeight)
    // console.log(event.clientX)
    // console.log(event.clientY)
    const button = this.element.nativeElement;
    console.log(button);
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // circle.style.width = circle.style.height = `${diameter}px`;
    // circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    // circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    console.log(ripple);
    if (ripple) {
      ripple.remove();
    }
    setTimeout(() => {
      // ripple.remove();
    }, 0);
    button.appendChild(circle);
  }
}
