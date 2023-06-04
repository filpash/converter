import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/core';
import { MaterialModule } from '@app/material.module';
import { ExchangeRateComponent } from '@app/components/exchange-rate/exchange-rate.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, MaterialModule],
  exports: [ExchangeRateComponent],
  declarations: [ExchangeRateComponent],
})
export class ExchangeRateModule {}
