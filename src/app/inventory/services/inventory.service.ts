import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventoryCount = 0;

  constructor() { }

  incrementCount() {
    this.inventoryCount++;
  }

  decrementCount() {
    this.inventoryCount--;
  }
}
