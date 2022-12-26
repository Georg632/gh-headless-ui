import { Directive, HostListener } from '@angular/core';
import { HlComboboxDirective } from './hl-combobox.directive';

@Directive({
  selector: '[hlComboboxInput]',
})
export class HlComboboxInputDirective<T> {
  @HostListener('keyup', ['$event']) change(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        this.combobox.selectActiveOption();
        break;
      case 'Escape':
        this.combobox.collapse();
        break;
      case 'ArrowDown':
        this.combobox.setNextItemActive();
        break;
      case 'ArrowUp':
        this.combobox.setPrevItemActive();
        break;
    }
  }

  @HostListener('focus') focus() {
    this.combobox.expand();
  }

  @HostListener('blur') focusLost() {
    this.combobox.collapse();
  }

  constructor(private combobox: HlComboboxDirective<T>) {
    this.combobox.trigger = this;
  }
}
