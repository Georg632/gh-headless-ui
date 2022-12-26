import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlComboboxComponent } from './hl-combobox/hl-combobox.component';
import { HlComboboxModule } from '../components/hl-combobox/hl-combobox.module';

@NgModule({
  declarations: [HlComboboxComponent],
  imports: [CommonModule, HlComboboxModule],
})
export class HlExamplesModule {}
