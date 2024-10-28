import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage {
  mostrarMenu = false; // Para controlar la visibilidad del menú

  constructor(private router: Router) {}

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu; // Alterna el menú desplegable
  }

  navigate(page: string) {
    this.router.navigate([`/${page}`]);
    this.mostrarMenu = false; // Cierra el menú al navegar
  }

  cerrarSesion() {
    console.log('Sesión cerrada');
    // Lógica para cerrar sesión
  }
}
