import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { Book, BookCardComponent } from "../../../shared/book-card/book-card.component";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-category-view',
    standalone: true,
    imports: [CommonModule, BookCardComponent],
    templateUrl: './category-view.component.html',
    styleUrls: ['./category-view.component.scss']
  })
  export class CategoryViewComponent {
    categoryName = signal<string>('');
    
    books = signal<Book[]>([
      {
        id: 1,
        title: 'El nombre del viento',
        author: 'Patrick Rothfuss',
        imageUrl: '../../../../../../assets/img/book1.png',
        availability: 'DISPONIBLE'
      },
      {
        id: 2,
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        imageUrl: 'assets/images/book2.jpg',
        availability: 'HAY POCAS COPIAS DISPONIBLES'
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        imageUrl: 'assets/images/book3.jpg',
        availability: 'NO HAY COPIAS DISPONIBLES'
      }
      // Agrega más libros según necesites
    ]);
  
    constructor(private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.categoryName.set(params['category']);
      });
    }
  }
  