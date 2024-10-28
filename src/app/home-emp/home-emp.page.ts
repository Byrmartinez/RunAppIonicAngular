import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-emp',
  templateUrl: './home-emp.page.html',
  styleUrls: ['./home-emp.page.scss'],
})
export class HomeEmpPage implements OnInit {

  historialEnvios = [
    { nombre: 'Envío 1', fecha: '2024-10-22', estado: 'Entregado' },
    { nombre: 'Envío 2', fecha: '2024-10-21', estado: 'Pendiente' }
  ];

  mostrarMenu = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  irACrearEnvio() {
    this.router.navigate(['/envio']);
  }

  navigate(route: string) {
    this.router.navigate([`/${route}`]);
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }
}
