import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './components/quotes/quotes.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuotesComponent,
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    FormsModule,
  ],
  exports: [
    QuotesComponent,
  ]
})
export class QuotesModule { }
