import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenthicationService } from '../services/autenthication.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage {
  mostrarMenu = false; // Para controlar la visibilidad del menú

  constructor(private router: Router, private autenthicationService: AutenthicationService) { }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu; // Alterna el menú desplegable
  }

  navigate(page: string) {
    this.router.navigate([`/${page}`]);
    this.mostrarMenu = false; // Cierra el menú al navegar
  }

  logout() {
    this.autenthicationService.logout();
  }
}
