import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { InventoryService } from '../../services/inventory.service';
import { MockInventoryService } from '../../testing/inventory.mock.service';


/*
  Pour que nous puissions savoir quand une méthode a été appelée sur un service ou non, nous devons espionner cette méthode.
  Jasmine peut nous dire quand une fonction a été appelée, quels étaient les paramètres et quelle était la valeur de retour.
*/

fdescribe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  let incrementSpy: jasmine.Spy;
  let decrementSpy: jasmine.Spy;
  let service: InventoryService;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);

    service = TestBed.inject(InventoryService);
    incrementSpy = spyOn(service, 'incrementCount');
    decrementSpy = spyOn(service, 'decrementCount');

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait appeler "incrementCount()" quand "increment()" est appelé', () => {         // teste si la fonction espionnée a été appelée ou non pendant le test.
    component.increment();                                                                  // si la fonction : increment() du composant est appelé
    expect(incrementSpy).toHaveBeenCalled();                                                // est ce que la fonction : incrementCount() est appelé dans le service ?
  });

  it('devrait appeler "decrementCount()" quand "decrement()" est appelé', () => {
    component.decrement();
    expect(decrementSpy).toHaveBeenCalled();
  });


});
