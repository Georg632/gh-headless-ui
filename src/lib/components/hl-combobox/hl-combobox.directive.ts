import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HlComboboxInputDirective } from './hl-combobox-input.directive';
import { HlComboboxOptionDirective } from './hl-combobox-option.directive';
import { HlComboboxOverlayDirective } from './hl-combobox-overlay.directive';

@Directive({
  selector: '[hlCombobox]',
})
export class HlComboboxDirective<T> implements OnChanges {
  overlay!: HlComboboxOverlayDirective<T>;
  trigger!: HlComboboxInputDirective<T>;
  options: HlComboboxOptionDirective<T>[] = [];

  _expanded: boolean = false;
  public get expanded(): boolean {
    return this._expanded;
  }
  public set expanded(e: boolean) {
    this._expanded = e;
  }

  @Output() activeChange: EventEmitter<T> = new EventEmitter<T>();
  @Input() selection!: T;
  @Output() selectionChange: EventEmitter<T> = new EventEmitter<T>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const selChange = changes['selection']?.currentValue;
    if (selChange) {
      const option = this.options.find(o => o.option == selChange);
      if (option) option.isSelected = true;
    }
  }

  expand() {
    if (this.expanded) return;
    this.overlay.expand();
    this.expanded = true;
  }

  collapse() {
    if (!this.expanded) return;
    this.overlay.collapse();
    this.expanded = false;
  }

  // option api
  addOption(optionDirective: HlComboboxOptionDirective<T>) {
    this.options.push(optionDirective);
    if (this.options.length == 1) this.setElementActive(optionDirective);
    optionDirective.isSelected = optionDirective.option == this.selection;
  }

  destroyOption(optionDirective: HlComboboxOptionDirective<T>) {
    this.options.splice(
      this.options.findIndex(o => o == optionDirective),
      1
    );
  }

  // select api
  selectActiveOption() {
    const currentActive = this.options.find(o => o.isActive);
    if (!currentActive) return;

    this.options.forEach(o => (o.isSelected = false));
    currentActive.isSelected = true;
    this.selectionChange.emit(currentActive.option);
    this.collapse();
  }

  // active api
  setNextItemActive() {
    const currentActive = this.options.findIndex(o => o.isActive);

    let nextItem: HlComboboxOptionDirective<T>;
    if (this.options.length - 1 == currentActive) nextItem = this.options[0];
    else nextItem = this.options[currentActive + 1];

    this.setElementActive(nextItem);
  }

  setPrevItemActive() {
    const currentActive = this.options.findIndex(o => o.isActive);

    let nextItem: HlComboboxOptionDirective<T>;
    if (currentActive == 0) nextItem = this.options[this.options.length - 1];
    else nextItem = this.options[currentActive - 1];

    this.setElementActive(nextItem);
  }

  setElementActive(directive: HlComboboxOptionDirective<T>) {
    this.expand();
    if (!directive) return;

    this.options.forEach(o => (o.isActive = false));

    directive.isActive = true;
    this.activeChange.emit(directive.option);
  }
}
