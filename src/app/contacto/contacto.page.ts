import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenthicationService } from '../services/autenthication.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage {
  mostrarMenu = false; // Para controlar la visibilidad del menú

  constructor(private router: Router, private autenthicationService: AutenthicationService) { }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu; // Alterna el menú desplegable
  }

  navigate(page: string) {
    this.mostrarMenu = false; // Cierra el menú al navegar
    this.router.navigate([`/${page}`]);
  }

  logout() {
    this.autenthicationService.logout();
  }
}
