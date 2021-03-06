import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookModel} from '../../models/book/book.model';
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { CartService} from '../../services/cart/cart.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: BookModel;
  @Output() addToCart: EventEmitter<BookModel> = new EventEmitter();

  constructor(private route: ActivatedRoute, private cs: CartService) {
    route.params.subscribe(res => {
      this.book = BookModel.find(res['title']);
    });
  }

  ngOnInit() {
  }

  sendToCart() {
    this.addToCart.emit(this.book);
    this.cs.add(this.book);
  }

  upvote() {
    return this.book.upvotes++;
  }

  votesCounter() {
    return this.book.upvotes;
  }

}
