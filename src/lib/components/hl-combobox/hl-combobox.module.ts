import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlComboboxDirective } from './hl-combobox.directive';
import { HlComboboxInputDirective } from './hl-combobox-input.directive';
import { HlComboboxOverlayDirective } from './hl-combobox-overlay.directive';
import { HlComboboxOptionDirective } from './hl-combobox-option.directive';

@NgModule({
  declarations: [
    HlComboboxDirective,
    HlComboboxInputDirective,
    HlComboboxOverlayDirective,
    HlComboboxOptionDirective,
  ],
  imports: [CommonModule],
  exports: [
    HlComboboxDirective,
    HlComboboxInputDirective,
    HlComboboxOverlayDirective,
    HlComboboxOptionDirective,
  ],
})
export class HlComboboxModule {}
