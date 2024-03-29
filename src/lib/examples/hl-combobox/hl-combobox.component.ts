import { Component } from '@angular/core';
import { HlComboboxDirective } from '../../components/hl-combobox/hl-combobox.directive';
import { HlComboboxInputDirective } from '../../components/hl-combobox/hl-combobox-input.directive';
import { HlComboboxOptionDirective } from '../../components/hl-combobox/hl-combobox-option.directive';
import { HlComboboxOverlayDirective } from '../../components/hl-combobox/hl-combobox-overlay.directive';

@Component({
  selector: 'gh-hl-combobox',
  templateUrl: './hl-combobox.component.html',
  standalone: true,
  imports: [
    HlComboboxDirective,
    HlComboboxInputDirective,
    HlComboboxOptionDirective,
    HlComboboxOverlayDirective,
  ],
})
export class HlComboboxComponent {
  options: { id: number; label: string }[] = [
    { id: 0, label: 'Option0' },
    { id: 1, label: 'Option1' },
    { id: 2, label: 'Option2' },
    { id: 3, label: 'Option3' },
  ];
  selectedOption: { id: number; label: string } = this.options[0];

  constructor() {}
}
