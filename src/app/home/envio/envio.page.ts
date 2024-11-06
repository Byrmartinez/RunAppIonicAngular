import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Envio } from '../../models/envio.model';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AutenthicationService } from 'src/app/services/autenthication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.page.html',
  styleUrls: ['./envio.page.scss'],
})
export class EnvioPage implements OnInit {
  envio: any; // o simplemente 'envio: Envio;'
  id: any;
  userId: any;
  usuario = [];
  body = {};
  mostrarMenu = false; // Para controlar la visibilidad del menú
  constructor(private router: Router, private autenthicationService: AutenthicationService, private activateRoute: ActivatedRoute, private api: ApiRestService) {
  }

  ngOnInit() {

    this.id = this.activateRoute.snapshot.paramMap.get("id");
    console.log("leyendo id para pasar a enviopage..id", this.id);
    this.userId = this.autenthicationService.getUserId();
    console.log("aqui trato de traer el usuario id" + this.userId)
    this.api.getEnvioById(this.id).subscribe((res) => {
      //console.log("esta es la res de by id" + res)
      this.envio = new Envio(res);
      //console.log("esta es la res de by id" + this.envio)
    }, (error: any) => {
      console.log(error);
    });

  }
  aceptarEnvio() {
    this.body = { id: this.id, estado: "aceptado", usuarioId: this.userId };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);

    }, (error) => {
      console.log(error);
    });
  };
  comenzarEnvio() {
    this.body = { id: this.id, estado: "enCamino", usuarioId: this.userId };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);

    }, (error) => {
      console.log(error);
    });
  };
  entregarEnvio() {
    this.body = { id: this.id, estado: "entregado", usuarioId: this.userId };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);

    }, (error) => {
      console.log(error);
    });
  };
  doRefresh(event: any) {

    this.api.getEnvioById(this.id).subscribe((res) => {
      this.envio = res;
    }, (error) => {
      console.log(error);
    });
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
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


