import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuoteService } from '../../services/quote.service';

import { QuotesComponent } from './quotes.component';
import { QuoteModel } from "../../models/quote-model";

fdescribe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  -------------------------------------------------------------------------------------------------------------------






  it('utiliser la liste des citations du service', () => {
    const quoteService = fixture.debugElement.injector.get(QuoteService);

    // (1)  le composant doit encore être rendu
    fixture.detectChanges();  // (2)  jusqu'à ce que la méthode detectChanges soit appelée :

    expect(quoteService.getQuote()).toEqual(component.quoteList);
  });

/*
  it('devrait créer un nouveau poste', () => {
    component.quoteText = 'le message composant à tester';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.innerHTML).toContain('le message composant à tester');
  });
*/




  it('doit désactiver le bouton lorsque la zone de texte est vide.', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it("doit activer le bouton lorsque la zone de texte n'est pas vide.", () => {
    component.quoteText = "I love this test";
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

/*
  it("should remove post upon card click", () => {
    component.quoteText = "This is a fresh post";
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css(".row"))
      .query(By.css(".card"))
      .triggerEventHandler("click", null);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("This is a fresh post");
  });
*/


  it("doit récupérer les données de manière asynchrone", async () => {
    const fakedFetchedList = [
      new QuoteModel("I love unit testing", "Mon 4, 2018")
    ];
    const quoteService = fixture.debugElement.injector.get(QuoteService);
    let spy = spyOn(quoteService, "fetchQuotesFromServer").and.returnValue(         // spy : simulent le fonctionnement de la méthode
      Promise.resolve(fakedFetchedList)
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {                         // whenStable : permet d'accéder aux résultats de toutes les tâches asynchrones lorsqu'elles sont terminées
      expect(component.fetchedList).toBe(fakedFetchedList);
    });
  });


});





