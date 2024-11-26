import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book!: Book;
  
  getAvailabilityClass(): string {
    const availabilityMap = {
      'DISPONIBLE': 'available',
      'HAY POCAS COPIAS DISPONIBLES': 'few-copies',
      'NO HAY COPIAS DISPONIBLES': 'unavailable'
    };
    return availabilityMap[this.book.availability as keyof typeof availabilityMap];
  }

  onDetailsClick(): void {
    console.log('View details for book:', this.book.id);
  }
}

export interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  availability: 'DISPONIBLE' | 'HAY POCAS COPIAS DISPONIBLES' | 'NO HAY COPIAS DISPONIBLES';
}
