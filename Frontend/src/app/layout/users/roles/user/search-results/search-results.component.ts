import { Component, OnInit } from "@angular/core";
import { Book, BookCardComponent } from "../../../shared/book-card/book-card.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-search-results',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, BookCardComponent, FormsModule],
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
  })
  export class SearchResultsComponent implements OnInit {
    books: Book[] = [
      {
        id: 1,
        title: 'El Nombre del Viento',
        author: 'Patrick Rothfuss',
        imageUrl: 'assets/books/book1.jpg',
        availability: 'DISPONIBLE'
      },
      {
        id: 2,
        title: 'Cien Años de Soledad',
        author: 'Gabriel García Márquez',
        imageUrl: 'assets/books/book2.jpg',
        availability: 'HAY POCAS COPIAS DISPONIBLES'
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        imageUrl: 'assets/books/book3.jpg',
        availability: 'NO HAY COPIAS DISPONIBLES'
      }
    ];
  
    constructor() {}
  
    ngOnInit(): void {}
  }