// features/public/pages/home/home.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="home-container">
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <img src="assets/images/book-icon.svg" alt="Epílogo">
            <span>Epilogo</span>
          </div>
          <nav>
            <a routerLink="/about">Sobre Nosotros</a>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="hero-content">
          <h1>Epilogo</h1>
          <h2>La biblioteca digital para todos</h2>
          <p class="description">
            Descubre una experiencia de reserva única en Epilogo, la plataforma 
            virtual donde puedes explorar y reservar tus libros favoritos de 
            manera sencilla y rápida. Nuestro sistema te muestra en tiempo real 
            el estado de disponibilidad de cada libro, para que puedas saber al 
            instante si hay copias disponibles, pocas copias restantes o si están 
            todas reservadas.
          </p>
          <div class="button-group">
            <button class="btn-primary" routerLink="/auth/login">Iniciar sesión</button>
            <button class="btn-secondary" routerLink="/auth/register">Registrarte</button>
          </div>
        </div>
        <div class="hero-image">
          <img src="assets/images/epilogo-book.jpg" alt="Libro Epílogo">
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Enlaces Útiles</h3>
            <ul>
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Iniciar sesión</a></li>
              <li><a href="#">Registrarse</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Redes Sociales</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contáctanos</h3>
            <p>Dirección: Calle Pericles 123, Ciudad, País</p>
            <p>Teléfono: +123 456 7890</p>
            <p>Correo electrónico: contacto@epilogo.com</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright © 2024 Epílogo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      background-color: #F4F1EA;
      padding: 1rem 2rem;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo img {
      height: 32px;
    }

    .main-content {
      flex: 1;
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      font-size: 3rem;
      color: #18184a;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-size: 2rem;
      color: #18184a;
      margin-bottom: 2rem;
    }

    .description {
      max-width: 800px;
      margin: 0 auto 2rem;
      color: #333;
      line-height: 1.6;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .btn-primary {
      background-color: #6366F1;
      color: white;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
    }

    .btn-secondary {
      background-color: transparent;
      color: #6366F1;
      padding: 0.75rem 2rem;
      border: none;
      cursor: pointer;
    }

    .hero-image {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    .hero-image img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .footer {
      background-color: #6B7280;
      color: white;
      padding: 3rem 2rem 1rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h3 {
      margin-bottom: 1rem;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.5rem;
    }

    .footer-section a {
      color: white;
      text-decoration: none;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }

      .main-content {
        padding: 2rem 1rem;
      }

      h1 {
        font-size: 2.5rem;
      }

      h2 {
        font-size: 1.5rem;
      }

      .button-group {
        flex-direction: column;
      }
    }
  `]
})
export class HomePage {}