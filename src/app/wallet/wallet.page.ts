import { Component, OnInit, OnDestroy } from '@angular/core'; // Importar OnInit
import { Router, NavigationEnd } from '@angular/router';
import { ApiRestService } from '../services/api-rest.service';
import { AutenthicationService } from '../services/autenthication.service';
import { Envio } from '../models/envio.model';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnDestroy {

  private refreshInterval: any;
  private routeSub: Subscription | undefined;
  selectedTab: string = 'pendientes';
  envios: Envio[] = [];
  enviosPendientes: Envio[] = [];
  enviosAceptados: Envio[] = [];
  enviosEncamino: Envio[] = [];
  enviosEntregados: Envio[] = [];
  id: any
  envio: any; // o simplemente 'envio: Envio;'
  userId: any;
  riderId: any;
  usuario = [];
  body = {};
  body2 = {};
  mostrarMenu = false; // Para controlar la visibilidad del menú
  estado: string = "";
  //nuevo
  pendingCount = 0;
  acceptedCount = 0;
  inTransitCount = 0;
  deliveredCount = 0;
  //nuevo
  saldo: any;
  deuda: any;
  response = [];


  constructor(private alertController: AlertController, private cookieService: CookieService, private cd: ChangeDetectorRef, private router: Router, private api: ApiRestService, private autenthicationService: AutenthicationService) { }

  ngOnInit() {
    this.iniciarCargaDeEnvios();
    this.cargarDatos();
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es la de envíos
        if (this.router.url === '/wallet') {
          this.iniciarCargaDeEnvios();
        } else {
          this.detenerCargaDeEnvios();
        }
      }
    });
    let cookieValue = this.cookieService.get('idRider');
    console.log("este es el contenido de la cockie: " + cookieValue);
    this.riderId = this.cookieService.get('idRider');
    console.log("este es el contenido de la riderId: " + this.riderId);
  }

  // Método para cargar datos desde la base de datos (dummy en este caso)
  cargarDatos() {
    let cookieValue = this.cookieService.get('idRider');
    console.log("este es el contenido de la cockie dentro de cargar datos: " + cookieValue);
    this.riderId = this.cookieService.get('idRider');
    console.log("el ridferid antes de la consulta es> " + this.riderId)
    this.api.getDatosRidersById(this.riderId).subscribe((response) => {
      this.saldo = response.saldo;
      console.log("el saldo despues de la consulta es> " + this.saldo)
      console.log("el saldo despues de la consulta es> " + this.response)
      this.deuda = response.deuda;
      console.log("la deuda despues de la consulta es> " + this.deuda)


    }, (error) => {
      console.log(error);
    });
    // Aquí harías la solicitud a la base de datos
  }

  // Método para redirigir a la página de renovación
  renovarPlan() {
    this.router.navigate(['/renew']);
  }
  cargarEnvios() {
    this.api.getEnvios().subscribe((res: any[]) => {
      this.envios = res.map(data => new Envio(data));
      console.log(this.envios)
      this.updateEnviosCount();
      this.cd.detectChanges();

    }, (error) => {
      console.log(error);
    });
  }

  doRefresh(event: any) {
    this.cargarEnvios();
    this.updateEnviosCount();
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    this.detenerCargaDeEnvios();
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
  iniciarCargaDeEnvios(): void {
    this.cargarEnvios(); // Carga inicial
    if (!this.refreshInterval) {
      this.refreshInterval = setInterval(() => {
        this.cargarEnvios();
      }, 5000);
    }
  }

  detenerCargaDeEnvios(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
  updateEnviosCount() {
    this.pendingCount = this.envios.filter(envio => envio.estado === 'pendiente' && envio.usuarioId === this.riderId).length;
    this.enviosPendientes = this.envios.filter(envio => envio.estado === 'pendiente' && envio.usuarioId === this.riderId);

    this.acceptedCount = this.envios.filter(envio => envio.estado === 'aceptado' && envio.usuarioId === this.riderId).length;
    this.enviosAceptados = this.envios.filter(envio => envio.estado === 'aceptado' && envio.usuarioId === this.riderId);

    this.inTransitCount = this.envios.filter(envio => envio.estado === 'enCamino' && envio.usuarioId === this.riderId).length;
    this.enviosEncamino = this.envios.filter(envio => envio.estado === 'enCamino' && envio.usuarioId === this.riderId);

    this.deliveredCount = this.envios.filter(envio => envio.estado === 'entregado' && envio.usuarioId === this.riderId).length;
    this.enviosEntregados = this.envios.filter(envio => envio.estado === 'entregado' && envio.usuarioId === this.riderId);
    console.log("estos son los pendingCount: " + this.pendingCount)
    console.log("estos son los acceptedCount: " + this.acceptedCount)
    console.log("estos son los inTransitCount: " + this.inTransitCount)
    console.log("estos son los deliveredCount: " + this.deliveredCount)
  }
  //aceptarEnvio(id: number) {
  //console.log(`Envio ${id} aceptado`);
  // Lógica para aceptar el envío (ejemplo: llamada a una API)
  //}

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





  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
