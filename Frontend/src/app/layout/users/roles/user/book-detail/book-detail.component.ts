import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    coverImage: string;
    copies: number;
    available: boolean;
}

@Component({
    selector: 'app-book-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})
  export class BookDetailComponent implements OnInit {
    book: Book = {
      id: 1,
      title: 'Nombre del libro',
      author: 'Nombre del autor',
      genre: 'Nombre del genero',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel imperdiet justo. Fusce congue sit amet orci et faucibus. Sed molestie tortor sed mi tempor, at tempor dui tincidunt. Donec posuere scelerisque odio. Integer fringilla magna ante, id aliquam ex volutpat vel. Pellentesque tincidunt arcu at aliquam consequat. Nulla sollicitudin fringilla nibh, quis interdum velit iaculis nec.',
      coverImage: '../../../../../../assets/img/Ciencia Ficcion.png',
      copies: 5,
      available: true
    };
  
    getAvailabilityStatus() {
      if (this.book.copies === 0) {
        return { text: 'NO HAY COPIAS DISPONIBLES', class: 'no-copies' };
      } else if (this.book.copies <= 3) {
        return { text: 'POCAS COPIAS DISPONIBLES', class: 'few-copies' };
      } else {
        return { text: 'DISPONIBLE', class: 'available' };
      }
    }
  
    ngOnInit() {
    }
  
    onReserve() {
        console.log('Libro reservado:', this.book.title);
    }
  }