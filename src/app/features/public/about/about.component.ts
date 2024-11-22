// features/public/pages/about/about.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule,translate } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule], 
  selector: 'app-about',
  template: './about.component.html', 
  styles: [`
    /* Custom styles complementing Bootstrap */
    .hover-card {
      transition: transform 0.3s ease;
    }

    .hover-card:hover {
      transform: translateY(-5px);
    }

    .team-img {
      height: 250px;
      object-fit: cover;
    }

    .values-section i {
      color: #6366F1;
    }

    /* Custom button colors matching Epilogo theme */
    .btn-primary {
      background-color: #6366F1;
      border-color: #6366F1;
    }

    .btn-outline-primary {
      color: #6366F1;
      border-color: #6366F1;
    }

    .btn-outline-primary:hover {
      background-color: #6366F1;
      color: white;
    }

    /* Hero section background */
    .hero-section {
      background: linear-gradient(135deg, #F4F1EA 0%, #E6E9DA 100%);
    }
  `]
})
export class AboutPage {
  values = [
    {
      icon: 'bi bi-book',
      title: 'about.values.accessibility.title',
      description: 'about.values.accessibility.description'
    },
    {
      icon: 'bi bi-people',
      title: 'about.values.community.title',
      description: 'about.values.community.description'
    },
    {
      icon: 'bi bi-lightning',
      title: 'about.values.innovation.title',
      description: 'about.values.innovation.description'
    }
  ];

  team = [
    {
      name: 'Ana García',
      role: 'about.team.roles.founder',
      image: 'assets/images/team/ana.jpg'
    },
    {
      name: 'Carlos López',
      role: 'about.team.roles.tech',
      image: 'assets/images/team/carlos.jpg'
    },
    {
      name: 'María Rodríguez',
      role: 'about.team.roles.librarian',
      image: 'assets/images/team/maria.jpg'
    }
  ];
}