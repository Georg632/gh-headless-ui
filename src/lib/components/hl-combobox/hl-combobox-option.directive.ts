import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { HlComboboxDirective } from './hl-combobox.directive';

@Directive({
  selector: '[hlComboboxOption]',
  standalone: true,
})
export class HlComboboxOptionDirective<T> implements OnInit, OnDestroy {
  element!: HTMLElement;
  @Input('hlComboboxOption') option!: T;

  _isActive: boolean = false;
  public get isActive(): boolean {
    return this._isActive;
  }
  public set isActive(value: boolean) {
    this._isActive = value;
    if (value) this.renderer.addClass(this.element, 'active');
    else this.renderer.removeClass(this.element, 'active');
  }

  _isSelected: boolean = false;
  public get isSelected(): boolean {
    return this._isSelected;
  }
  public set isSelected(value: boolean) {
    this._isSelected = value;
    if (value) this.renderer.addClass(this.element, 'selected');
    else this.renderer.removeClass(this.element, 'selected');
  }

  constructor(
    private renderer: Renderer2,
    private combobox: HlComboboxDirective<T>,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  ngOnInit(): void {
    const view: EmbeddedViewRef<T> = this.viewContainer.createEmbeddedView(
      this.templateRef,
      {
        $implicit: this.option,
      },
    );
    this.element = view.rootNodes[0];
    this.applyHostlisteners(this.element);

    this.combobox.addOption(this);
  }

  applyHostlisteners(el: HTMLElement) {
    this.renderer.listen(el, 'pointerenter', () => {
      this.combobox.setElementActive(this);
    });

    this.renderer.listen(this.element, 'mousedown', (event: PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.combobox.setElementActive(this);
      this.combobox.selectActiveOption();
    });
  }

  ngOnDestroy(): void {
    this.combobox.destroyOption(this);
  }
}
