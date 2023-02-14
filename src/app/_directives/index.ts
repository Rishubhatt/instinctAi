import { ButtonLoaderDirective } from './buttonloader.directive'
import { LoaderDirective } from './loader.directive'
import { RippleDirective } from './ripple.directive';


export const directive: any = [
    LoaderDirective,
    ButtonLoaderDirective,
    RippleDirective
]

export * from './loader.directive';
export * from './buttonloader.directive';
export * from './ripple.directive'