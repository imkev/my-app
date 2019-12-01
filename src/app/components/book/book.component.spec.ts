import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, PipeTransform} from '@angular/core';
import { BookComponent } from './book.component';
import { BookModel } from '../../models/book/book.model';
import { CartService } from '../../services/cart/cart.service';
import { CartServiceMock } from '../../services/cart/cart.service.mock';
import {Mock} from 'protractor/built/driverProviders';

@Pipe({name: 'discount'})
class MockPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent, MockPipe ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: CartService, useClass: CartServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    book = new BookModel(
      faker.image.image(),
      faker.lorem.words(),
      faker.lorem.paragraph(),
      1234.55,
      0
    );
    component.book = book;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should emit addToCart event', (done) => {
    component.addToCart.subscribe(e => {
      expect(e).toEqual(component.book);
      done();
    });
    component.sendToCart();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the book image', () => {
    const image = nativeElement.querySelector('.book-image').getAttribute('src');
    expect(image).toEqual(book.image);
  });

  it('should show the book title', () => {
    const title = nativeElement.querySelector('.book-title').innerHTML;
    expect(title).toEqual(book.title);
  });

  it('should show the book description', () => {
    const description = nativeElement.querySelector('.book-description').innerHTML;
    expect(description).toEqual(book.description);
  });

  it('should show the book description', () => {
    const price = nativeElement.querySelector('.book-price').innerHTML;
    expect(price).toEqual('$1,234.55');
  });

  xit('pending', () => {
    const any: any = jasmine.any(Number);
  });

  it('should set correct number of upvotes', () => {
    const votes = component.votesCounter();
    expect(component.votesCounter()).toEqual(votes);
  });

  it('upvote invokes the component function',  () => {
    const spy = spyOn(component, 'upvote');
    const button = nativeElement.querySelector('button.upvote');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call to a function sendToCart when clicked', function () {
    const spy = spyOn(component, 'sendToCart');
    const button = nativeElement.querySelector('button.send-to-cart');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

});
