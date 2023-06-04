import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { CurrencyConverterComponent } from '@app/components/currency-converter/currency-converter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, MaterialModule, ReactiveFormsModule],
  exports: [CurrencyConverterComponent],
  declarations: [CurrencyConverterComponent],
})
export class CurrencyConverterModule {}
