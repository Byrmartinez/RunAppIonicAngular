import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Envio } from '../../models/envio.model';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AutenthicationService } from 'src/app/services/autenthication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.page.html',
  styleUrls: ['./envio.page.scss'],
})
export class EnvioPage implements OnInit {
  estado: any;
  envio: any; // o simplemente 'envio: Envio;'
  id: any;
  userId: any;
  usuario = [];
  body = {};
  mostrarMenu = false; // Para controlar la visibilidad del menú
  constructor(private storage: Storage, private toastController: ToastController, private router: Router, private autenthicationService: AutenthicationService, private activateRoute: ActivatedRoute, private api: ApiRestService) {
    this.storage.create();
  }

  ngOnInit() {

    this.id = this.activateRoute.snapshot.paramMap.get("id");
    console.log("leyendo id para pasar a enviopage..id", this.id);
    this.getUserId()
    this.userId = this.getUserId();
    console.log("aqui trato de traer el usuario id" + this.userId)
    this.loadEnvio();
    console.log(localStorage.getItem('USER_DATA'));
    console.log(this.storage.get('email'));
    console.log(this.storage.get('password'));
    console.log(this.storage.get('id'));
    //this.storage.get('id').then(userId => {
    //console.log('ID obtenido:', userId); // Esto debería mostrar el id como un string
    //});

  }

  async getUserId() {
    try {
      const id2 = await this.storage.get('id');
      this.userId = id2; // Aquí debes obtener el id en string
      console.log("Aquí debería ser el string correcto" + this.userId); // Aquí debería ser el string correcto
    } catch (error) {
      console.error("Error al obtener el ID:", error);
    }
  }

  loadEnvio() {
    this.api.getEnvioById(this.id).subscribe((res) => {
      //console.log("esta es la res de by id" + res)
      this.envio = new Envio(res);
      //console.log("esta es la res de by id" + this.envio)
    }, (error: any) => {
      console.log(error);
    });
  }
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  aceptarEnvio() {
    this.body = { id: this.id, estado: "aceptado", usuarioId: this.userId };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);
      this.showToast("Envío aceptado");
      this.loadEnvio();

    }, (error) => {
      console.log(error);
    });
  };
  comenzarEnvio() {
    this.body = { id: this.id, estado: "enCamino", usuarioId: this.userId };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);
      this.showToast("Envío en camino");
      this.loadEnvio();

    }, (error) => {
      console.log(error);
    });
  };
  entregarEnvio() {
    this.body = { id: this.id, estado: "entregado", usuarioId: this.userId };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);
      this.showToast("Envío entregado");
      this.loadEnvio();

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


