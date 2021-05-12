import { TestBed } from '@angular/core/testing';

import { QuoteService } from './quote.service';

fdescribe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //

  it('créer un message dans un tableau', () => {
    const txt = "le message";
    service.addNewQuote(txt);
    expect(service.quoteList.length).toBeGreaterThanOrEqual(1);   // supérieur ou égal à
  });

  it('supprimer un message créé du tableau des messages.', () => {
    service.addNewQuote('le message');
    service.removeQuote(0);
    expect(service.quoteList.length).toBeLessThan(1);             // moins que
  });





});
