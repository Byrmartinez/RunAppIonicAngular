import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-emp',
  templateUrl: './wallet-emp.page.html',
  styleUrls: ['./wallet-emp.page.scss'],
})
export class WalletEmpPage implements OnInit {

  totalEnvios: number = 0;
  enviosRestantes: number = 0;
  deuda: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.cargarDatos();
  }

  // Método para cargar datos desde la base de datos (dummy en este caso)
  cargarDatos() {
    // Aquí harías la solicitud a la base de datos
    this.totalEnvios = 100;
    this.enviosRestantes = 10;
    this.deuda = 50;
  }

  // Método para redirigir a la página de renovación
  renovarPlan() {
    this.router.navigate(['/renew']);
  }
  

}
