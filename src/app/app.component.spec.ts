import {TestBed, async, fakeAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BookComponent} from './components/book/book.component';
import { CartServiceMock, CartList } from './services/cart/cart.service.mock';
import { CartService} from './services/cart/cart.service';
import * as faker from 'faker';
import { DiscountFormatterPipe } from './pipes/discount-formatter/discount-formatter.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        BookComponent,
        DiscountFormatterPipe
      ],
      providers: [
        { provide: CartService, useClass: CartServiceMock }
      ]
    }).compileComponents();
  }));

  it('should display the cart after rendering', fakeAsync( () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.cart).toBe(CartList);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('my-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to my-app!');
  });
});
