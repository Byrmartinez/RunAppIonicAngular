import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { Router } from '@angular/router';
import { ApiRestService } from '../services/api-rest.service';
import { AutenthicationService } from '../services/autenthication.service';
import { Envio } from '../models/envio.model';

@Component({
  selector: 'app-myacc',
  templateUrl: './myacc.page.html',
  styleUrls: ['./myacc.page.scss'],
})
export class MyaccPage implements OnInit {
  envios: Envio[] = [];
  id: any

  mostrarMenu = false; // Para controlar la visibilidad del menú
  constructor(private router: Router, private api: ApiRestService, private autenthicationService: AutenthicationService) { }

  async ngOnInit() {
    this.api.getEnvios().subscribe((res: any[]) => {
      this.envios = res.map(data => new Envio(data));
      console.log(this.envios)

    }, (error) => {
      console.log(error);
    });
  }

  doRefresh(event: any) {
    this.api.getEnvios().subscribe((res) => {
      this.envios = res;
      console.log(this.envios)
    }, (error) => {
      console.log(error);
    });
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
