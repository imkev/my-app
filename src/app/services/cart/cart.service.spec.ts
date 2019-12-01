import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { CartService } from './cart.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { CartList } from './cart.service.mock';
import { Observable, of } from 'rxjs';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response } from '@angular/http';
import * as http from 'http';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDTm8_Q6-WZ5_yZfYZQKHtY4Uj_rvPhZrw',
    authDomain: 'angular-tdd-kluo.firebaseapp.com',
    databaseURL: 'https://angular-tdd-kluo.firebaseio.com',
    projectId: 'angular-tdd-kluo',
    storageBucket: 'angular-tdd-kluo.appspot.com',
    messagingSenderId: '106931142925',
    appId: '1:106931142925:web:3eb55f6e6486e8dfc03044',
    measurementId: 'G-MB9K1NFG1B'
  }
};

const AngularFirestoreMock = {
  collection: function ( param: any ) {
    return {
      valueChanges: function () { return of(CartList); },
      add: function(item) { return item; }
    };
  }
};

describe('CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        CartService,
        { provide: AngularFirestore, useValue: AngularFirestoreMock },
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend,
                       defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  it('should have callHttp working', inject([CartService, MockBackend],
    fakeAsync((service: CartService, backend: MockBackend) => {
      // tslint:disable-next-line:prefer-const
      let resFromBackEnd;

      const response = {
        'documents': [
          {
            'name': 'projects/angular-tdd-kluo/databases/(default)/documents/cart/sxS5BymhG2VNX3UYUOrX',
            'fields': {
              'genre': {
                'mapValue': {}
              },
              'category': {
                'stringValue': 'not defined'
              },
              'price': {
                'integerValue': '100.100'
              },
              'title': {
                'stringValue': 'Hello world'
              },
              'description': {
                'stringValue': 'Hello world description'
              },
              'image': {
                'stringValue': 'https://www.planwallpaper.com/static/images/Benjamin-Blonder.png'
              },
              'upvotes': {
                'integerValue': '0'
              }
            },
            'createTime': '2017-12-08T14:16:52.061390Z',
            'updateTime': '2017-12-08T14:16:52.061390Z'
          }]
      };

      backend.connections.subscribe(connection => {
        connection.mockRespond(new Response(<any>{
          body: JSON.stringify(response)
        }));
      });

      service.httpCall().subscribe(data => {
        resFromBackEnd = data;
      });

      tick();

      const jsonFromBackEnd = JSON.parse(resFromBackEnd.text());
      expect(jsonFromBackEnd).toEqual(response);
    })
  ));

  it('should be created', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));

  it('should have add method defined', inject([CartService], (service: CartService) => {
    expect(service.add).toBeTruthy();
  }));

  it('should have query method defined', inject([CartService], (service: CartService) => {
    expect(service.query).toBeTruthy();
  }));

  it('should have query method working', inject([CartService], fakeAsync((service: CartService) => {
    const all$ = service.query();
    let response;
    all$.subscribe((items) => {
      response = items;
    });
    tick();
    expect(response).toBe(CartList);
  })));
});
