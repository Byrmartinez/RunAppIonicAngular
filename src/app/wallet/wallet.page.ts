import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  totalViajes: number = 0;
  saldo: number = 0;
  deuda: number = 0;
  mostrarMenu: boolean = false;
  currentSegment: string = 'wallet'; // Valor predeterminado es 'wallet'

  constructor(private http: HttpClient, private router: Router) {
    // Escuchar los cambios de ruta para actualizar el segmento activo
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSegment();
      }
    });
  }

  ngOnInit() {
    this.getWalletData();
    this.updateSegment(); // Asegura que el segmento correcto esté activo al iniciar
  }

  // Método para obtener los datos de la base de datos
  getWalletData() {
    this.http.get('https://api.tuservidor.com/wallet')
      .subscribe((data: any) => {
        this.totalViajes = data.totalViajes;
        this.saldo = data.saldo;
        this.deuda = data.deuda;
      }, error => {
        console.error('Error al obtener los datos del wallet:', error);
      });
  }

  // Métodos de navegación
  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  navigate(page: string) {
    this.mostrarMenu = false; // Cierra el menú al navegar
    this.router.navigate([`/${page}`]);
  }

  cerrarSesion() {
    console.log('Cerrando sesión');
  }

  // Método para actualizar el segmento activo basado en la ruta actual
  updateSegment() {
    const url = this.router.url;
    if (url.includes('/home')) {
      this.currentSegment = 'home';
    } else if (url.includes('/wallet')) {
      this.currentSegment = 'wallet';
    } else if (url.includes('/indicadores')) {
      this.currentSegment = 'indicadores';
    } else if (url.includes('/myacc')) {
      this.currentSegment = 'mi-cuenta';
    }
  }
}
