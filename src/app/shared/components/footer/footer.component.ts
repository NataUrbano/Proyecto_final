import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-footer',
    template: `
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Enlaces Útiles</h3>
            <ul>
              <li><a routerLink="/about">Sobre nosotros</a></li>
              <li><a routerLink="/auth/login">Iniciar sesión</a></li>
              <li><a routerLink="/auth/register">Registrarse</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Redes Sociales</h3>
            <ul>
              <li><a href="https://facebook.com/epilogo">Facebook</a></li>
              <li><a href="https://instagram.com/epilogo">Instagram</a></li>
              <li><a href="https://tiktok.com/epilogo">TikTok</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Contáctanos</h3>
            <p>Dirección: Calle Enciso 123, Ciudad, País</p>
            <p>Teléfono: +123 456 7890</p>
            <p>Correo: contacto@epilogo.com</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright © 2024 Epílogo. Todos los derechos reservados.</p>
        </div>
      </footer>
    `,
    styles: [`
      .footer {
        background-color: #6B87A5;
        color: white;
        padding: 2rem 0;
      }
  
      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 0 2rem;
      }
  
      .footer-section h3 {
        margin-bottom: 1rem;
      }
  
      .footer-section ul {
        list-style: none;
        padding: 0;
      }
  
      .footer-section a {
        color: white;
        text-decoration: none;
        line-height: 1.8;
      }
  
      .footer-section a:hover {
        text-decoration: underline;
      }
  
      .footer-bottom {
        text-align: center;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255,255,255,0.1);
      }
    `]
  })
  export class FooterComponent {}
  