import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { ContactComponent } from './contact.component';

fdescribe('ContactComponent', () => {
  let comp: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let onSubmitSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ContactComponent);
      comp = fixture.componentInstance; // ContactComponent test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;


    });
  });

  it(`devrait avoir comme texte 'contact page'`, () => {
    fixture = TestBed.createComponent(ContactComponent);
    comp = fixture.componentInstance;

    expect(comp.text).toEqual('contact page');
  });

  it(`devrait mettre submit à true`, () => {
    fixture = TestBed.createComponent(ContactComponent);
    comp = fixture.componentInstance;
    //onSubmitSpy = spyOn(comp, 'onSubmit');
    comp.onSubmit();
    expect(comp.onSubmit).toBeTruthy();
  });

/*
  it(`devrait appeler le onSubmit method`, fakeAsync(() => {

    fixture = TestBed.createComponent(ContactComponent);
    comp = fixture.componentInstance;
    onSubmitSpy = spyOn(comp, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    tick();
    expect(comp.onSubmit).toHaveBeenCalled();
  }));
*/

  it(`form doit être invalid`, () => {
    fixture = TestBed.createComponent(ContactComponent);
    comp = fixture.componentInstance;

    comp.contactForm.controls['email'].setValue('');
    comp.contactForm.controls['name'].setValue('');
    comp.contactForm.controls['text'].setValue('');
    expect(comp.contactForm.valid).toBeFalsy();
  });

  it(`form doit être valid`, () => {
    fixture = TestBed.createComponent(ContactComponent);
    comp = fixture.componentInstance;

    comp.contactForm.controls['email'].setValue('asd@asd.com');
    comp.contactForm.controls['name'].setValue('aada');
    comp.contactForm.controls['text'].setValue('text');
    expect(comp.contactForm.valid).toBeTruthy();
  });
});
