import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { TreeComponent } from './components/tree/tree.component';
import { NgInitDirective } from './directive/ng-init/ng-init.directive';
import { CartService } from './services/cart/cart.service';
import { DiscountFormatterPipe } from './pipes/discount-formatter/discount-formatter.pipe';



const bookRoutes: Routes = [
  { path: 'books/:title', component: BookComponent },
  { path: 'books/:title/edit', component: BookEditComponent },
  { path: 'books', component: BookListComponent },
  {
    path: '',
    redirectTo: 'books/',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    BookEditComponent,
    TreeComponent,
    NgInitDirective,
    DiscountFormatterPipe
  ],
  imports: [
    RouterModule.forRoot(bookRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
