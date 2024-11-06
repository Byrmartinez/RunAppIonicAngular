import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { Router } from '@angular/router';
import { ApiRestService } from '../services/api-rest.service';
import { AutenthicationService } from '../services/autenthication.service';
import { Envio } from '../models/envio.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selectedTab: string = 'pendientes';
  envios: Envio[] = [];
  id: any
  envio: any; // o simplemente 'envio: Envio;'
  userId: any;
  usuario = [];
  body = {};
  mostrarMenu = false; // Para controlar la visibilidad del menú
  estado: string = "";
  //nuevo
  pendingCount = 0;
  acceptedCount = 0;
  inTransitCount = 0;
  deliveredCount = 0;
  //nuevo

  constructor(private router: Router, private api: ApiRestService, private autenthicationService: AutenthicationService) { }

  async ngOnInit() {
    this.api.getEnvios().subscribe((res: any[]) => {
      this.envios = res.map(data => new Envio(data));
      console.log(this.envios)

    }, (error) => {
      console.log(error);
    });
    this.updateEnviosCount();
  }

  doRefresh(event: any) {
    this.api.getEnvios().subscribe((res) => {
      this.envios = res;
      console.log(this.envios)
    }, (error) => {
      console.log(error);
    });
    this.updateEnviosCount();
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  updateEnviosCount() {
    this.pendingCount = this.envios.filter(envio => envio.estado === 'pendiente').length;
    this.acceptedCount = this.envios.filter(envio => envio.estado === 'aceptado').length;
    this.inTransitCount = this.envios.filter(envio => envio.estado === 'enCamino').length;
    this.deliveredCount = this.envios.filter(envio => envio.estado === 'entregado').length;
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
}

/*this.api.getUsuarios().subscribe((res) => {
  this.Usuarios = res;
  console.log(this.Usuarios)
}, (error) => {
  console.log(error);
});*/
