import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { of } from 'rxjs';

fdescribe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('doit retourner une collection de users', () => {
    const userResponse = [
      {
        id: '1',
        name: 'Jane',
        role: 'Designer',
        pokemon: 'Blastoise'
      }
    ];
    let response;
    spyOn(service, 'all').and.returnValue(of(userResponse));

    service.all().subscribe(res => {
      response = res;
    });

    expect(userResponse).toEqual(response);         // expect(...observable...).toEqual(...observable...);
  });



  it('devrait renvoyer un seul utilisateur', () => {
    const userResponse = {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      pokemon: 'Charizard'
    };
    let response;
    spyOn(service, 'findOne').and.returnValue(of(userResponse));

    service.findOne('2').subscribe(res => {
      response = res;
    });

    expect(response).toEqual(userResponse);
  });

});

