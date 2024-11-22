import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-admin-sidebar',
    template: `
      <aside class="sidebar" [class.open]="isOpen">
        <div class="sidebar-header">
          <img src="assets/images/logo.svg" alt="Epilogo">
          <span>Epilogo</span>
          <button (click)="close()">×</button>
        </div>
        <nav>
          <a routerLink="/admin/profile">
            <i class="bi bi-person"></i> Profile
          </a>
          <a routerLink="/admin/books">
            <i class="bi bi-book"></i> Reserva de libros
          </a>
          <a routerLink="/admin/catalog">
            <i class="bi bi-collection"></i> Libros
          </a>
          <a routerLink="/admin/users">
            <i class="bi bi-people"></i> Usuarios
          </a>
          <a (click)="logout()">
            <i class="bi bi-box-arrow-right"></i> Cerrar sesión
          </a>
        </nav>
      </aside>
    `,
    styles: [`
      .sidebar {
        background-color: #F4F1EA;
        width: 280px;
        height: 100vh;
        position: fixed;
        left: -280px;
        top: 0;
        transition: left 0.3s;
        padding: 1rem;
        z-index: 1000;
      }
  
      .sidebar.open {
        left: 0;
      }
  
      .sidebar-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }
  
      .sidebar-header img {
        height: 40px;
      }
  
      nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
  
      nav a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        color: #333;
        text-decoration: none;
        border-radius: 4px;
      }
  
      nav a:hover {
        background-color: #E6E9DA;
      }
    `]
  })
  export class AdminSidebarComponent {
    @Input() isOpen = false;
    @Output() closeEvent = new EventEmitter<void>();
  
    close() {
      this.closeEvent.emit();
    }
  
    logout() {
      // Implement logout logic
    }
  }