import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  pedidos = [
    { id: 1, comuna: 'Recoleta' },
    { id: 2, comuna: 'Independencia' },
    { id: 3, comuna: 'San Bernardo' },
    { id: 4, comuna: 'Maipú' },
    { id: 5, comuna: 'Recoleta' },
  ];

  mostrarMenu = false; // Para controlar la visibilidad del menú

  constructor(private router: Router) {}

  aceptarEnvio(id: number) {
    console.log(`Envio ${id} aceptado`);
    // Lógica para aceptar el envío (ejemplo: llamada a una API)
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu; // Alterna el menú desplegable
  }

  navigate(page: string) {
    this.mostrarMenu = false; // Cierra el menú al navegar
    this.router.navigate([`/${page}`]);
  }

  cerrarSesion() {
    console.log('Sesión cerrada');
    // Lógica para cerrar sesión
  }
}
