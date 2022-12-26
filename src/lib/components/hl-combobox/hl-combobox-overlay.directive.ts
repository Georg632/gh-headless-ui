import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { HlComboboxDirective } from './hl-combobox.directive';

@Directive({
  selector: '[hlComboboxOverlay]',
})
export class HlComboboxOverlayDirective<T> {
  constructor(
    private combobox: HlComboboxDirective<T>,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    combobox.overlay = this;
  }

  expand() {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  collapse() {
    this.viewContainer.clear();
  }
}
