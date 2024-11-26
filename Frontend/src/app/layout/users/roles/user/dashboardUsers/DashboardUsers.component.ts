import { Component, computed, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

interface Category {
  id: number;
  name: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [ ReactiveFormsModule, RouterModule],
  standalone: true, 
  templateUrl: './dashboardUsers.component.html',
  styleUrls: ['./dashboardUsers.component.scss']
})
export class DashboardUsersComponent {

  searchControl = new FormControl('');
  searchValue = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  categories = signal<Category[]>([
    {
      id: 1,
      name: 'Ciencia Ficción',
      image: '../../../../../../assets/img/Ciencia Ficcion.png',
      route: ''
    },
    {
      id: 2,
      name: 'Thriller',
      image: '../../../../../../assets/img/Thiller.png',
      route: '/categoria/thriller'
    },
    {
      id: 3,
      name: 'Poesía',
      image: '../../../../../../assets/img/Poesia.png',
      route: '/categoria/poesia'
    },
    {
      id: 4,
      name: 'Novela Histórica',
      image: '../../../../../../assets/img/Novela Historica.png',
      route: '/categoria/novela-historica'
    },
    {
      id: 5,
      name: 'Historical Fiction',
      image: '../../../../../../assets/img/Historical Fiction.png',
      route: '/categoria/historical-fiction'
    },
    {
      id: 6,
      name: 'World Literature',
      image: '../../../../../../assets/img/Word Literature.png',
      route: '/categoria/world-literature'
    }
  ]);

  filteredCategories = computed(() => {
    const search = this.searchValue()?.toLowerCase() ?? '';
    return this.categories().filter(category => 
      category.name.toLowerCase().includes(search)
    );
  });
}
