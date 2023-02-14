import { RippleDirective } from '../_directives/ripple.directive';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';

export const Components: any[] = [
  ButtonComponent,
  RippleDirective,
  ModalComponent,
];
export * from '../_directives/ripple.directive';
export * from './button/button.component';
