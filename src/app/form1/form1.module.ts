import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form1Component } from './components/form1/form1.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Form1Component,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    Form1Component,
    ContactComponent
  ],
})
export class Form1Module { }
