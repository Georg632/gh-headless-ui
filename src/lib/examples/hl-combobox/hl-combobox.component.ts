import { Component } from '@angular/core';

@Component({
  selector: 'gh-hl-combobox',
  templateUrl: './hl-combobox.component.html',
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
