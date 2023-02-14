import {
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from '../_components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private rootViewContainer: ViewContainerRef | any;
  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  component: any;

  setRootViewContainerRef(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
  }
  addDynamicComponent(data: any) {
    this.removeDynamicComponent();
    const factory =
      this.factoryResolver.resolveComponentFactory(ModalComponent);
    this.component = factory.create(this.rootViewContainer.parentInjector);
    this.component.instance.title = data.title ? data.title : '';
    this.component.instance.contentTpl = data.contentTpl ? data.contentTpl : '';
    this.component.instance.text = data.text ? data.text : '';
    this.component.instance.closeIsAbled = data.closeIsAbled ? true : false;

    this.component.instance.closeModal.subscribe(() =>
      this.removeDynamicComponent()
    );
    this.rootViewContainer.insert(this.component.hostView);
    return this.component;
  }

  removeDynamicComponent() {
    if (this.component) {
      this.component.destroy();
    }
  }
}
