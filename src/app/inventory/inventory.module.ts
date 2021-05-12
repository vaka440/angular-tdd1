import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventory/inventory.component';



@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InventoryComponent
  ],
})
export class InventoryModule { }
