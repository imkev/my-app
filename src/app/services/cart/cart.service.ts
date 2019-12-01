import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BookModel } from '../../models/book/book.model';
import { Subject} from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private emitAddToCart = new Subject<any>();
  addEmitted$ = this.emitAddToCart.asObservable();
  hardCodedUrl = 'https://firestore.googleapis.com/v1/projects/angular-tdd-kluo/databases/(default)/documents/cart?key=AIzaSyDTm8_Q6-WZ5_yZfYZQKHtY4Uj_rvPhZrw';

  constructor(private db: AngularFirestore, private http: Http) { }

  query() {
    // promise
    return this.db.collection('/cart').valueChanges();
  }

  add(data) {
    let item = this.db.collection<BookModel>('/cart').add(data.getData());
    this.emitAddToCart.next(item);
    return item;
  }

  emitChange(book: BookModel) {
    this.emitAddToCart.next(book);
  }

  httpCall() {
    return this.http.get(this.hardCodedUrl);
  }
}
