import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotesModule } from './quotes/quotes.module';
import { InventoryModule } from './inventory/inventory.module';
import { TodosModule } from './todos/todos.module';
import { Form1Module } from './form1/form1.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuotesModule,
    FormsModule,
    InventoryModule,
    TodosModule,
    Form1Module,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
