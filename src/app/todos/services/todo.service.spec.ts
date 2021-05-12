import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs'; // Add import

/**
Angular fournit un module complet pour nous aider à tester les requêtes HTTP appelées le HttpClientTestingModule qui nous permet de:
- Simulez une demande
- Créez une fausse demande avec n'importe quel code de statut
- Transmettez une réponse avec de fausses données
- Annuler une demande
*/

fdescribe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })



  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('getSingleTodo doit envoyer une requête GET et retourner un seul élément.', (done) => {

    service.getSingleTodo(1).subscribe(
      (item: Todo) => {
        expect(item).toBeDefined();
        done();
      },
      (error) => { fail(error.message) }
    );

    const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush({ id: 1, userId: 1, title: 'Test Todo', completed: false });            // simule l'envoi d'un todo
  });


  it('getSingleTodo devrait déclencher une erreur si trois tentatives de requête échouent.', (done) => {
    const id = 1;
    const errMessage = `Failed to fetch item with id ${id}`;

    service.getSingleTodo(id).subscribe(
      data => {
        fail('The request is supposed to throw an error')         // genere un echec du test parceque ce test n'est pas censé aller dans data =>
      },
      (error: string) => {
        expect(error).toEqual(errMessage);
        done();
      },
    );

    const retryCount = 3;
    for (let i = 0; i <= retryCount; i++) {
      httpMock
        .expectOne({url: 'https://jsonplaceholder.typicode.com/todos/1', method: 'GET'})
        .flush({}, { status: 404, statusText: errMessage });                              // simule une erreur 404
    }
  });


  it('createTodo doit envoyer une requête POST et retourner l\'élément nouvellement créé.', (done) => {

    const item: Todo = {
      id: 2,
      userId: 2,
      title: 'Walk dog',
      completed: false
    };

    service.createTodo(item).subscribe(
      (data: Todo) => { expect(data).toBeDefined(); expect(data).toEqual(item); done() },
      (error) => { fail(error.message) }
    );

    const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(item);
  });

});

fdescribe('getAllTodos', () => {

  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })


  it('doit envoyer une requête GET et retourner un tableau d\'éléments', (done) => {
    service.getAllTodos().subscribe(
      (data: Todo[]) => {
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBe(1);
        done();
      },
      (error: HttpErrorResponse) => { fail('The request was supposed to return data') }
    );

    const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush([{ id: 1, userId: 1, title: 'Test Todo', completed: false }]);
  });



  it('devrait retourner un tableau vide si une erreur de serveur interne se produit.', (done) => {

    service.getAllTodos().subscribe(
      (data: Todo[]) => {
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBe(0);
        done()
      },
      (error: HttpErrorResponse) => { fail('The request was supposed to return an empty array') }
    );

    const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush({}, { status: 500, statusText: 'Internal Server Error' });
  })

  //


  it('doit retourner une collection de users', () => {
    const userResponse = [
      {
        id: 1,
        userId: 1,
        title: 'user 1',
        completed: false
      },
      {
        id: 2,
        userId: 2,
        title: 'user 2',
        completed: true
      }
    ];
    let response;
    spyOn(service, 'getAllTodos').and.returnValue(of(userResponse));

    service.getAllTodos().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(userResponse);
  });


});



fdescribe('updateTodos', () => {
  let displayErrorSpy: jasmine.Spy;
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  beforeEach(() => {
    displayErrorSpy = spyOn(service, 'displayError');
  })


  it('doit afficher un message d\'erreur si la demande n\'est pas autorisée.', (done) => {

    service
      .updateTodo({ id: 1, userId: 1, title: 'Walk dog', completed: true })
      .subscribe(
        (data => {
          expect(data).toBeNull();
          expect(displayErrorSpy).toHaveBeenCalledWith('Unauthorized request');
          done();
        }),
        (error: HttpErrorResponse) => { fail('The Observable is not supposed to fail') }
    );

    const testRequest = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(null, { status: 401, statusText: 'Unauthorized request'});
  });


});


