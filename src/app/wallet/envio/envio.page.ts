import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Envio } from '../../models/envio.model';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AutenthicationService } from 'src/app/services/autenthication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CookieService } from 'ngx-cookie-service';
import { AlertController } from '@ionic/angular';

declare var google: any;
declare var marker: any;

@Component({
  selector: 'app-envio',
  templateUrl: './envio.page.html',
  styleUrls: ['./envio.page.scss'],
})
export class EnvioPage implements OnInit {
  riderIdCookie: any;
  estado: any;
  envio: any; // o simplemente 'envio: Envio;'
  envioActual: any; // o simplemente 'envio: Envio;'
  contadorActualEntrada: any; // o simplemente 'envio: Envio;'
  contadorActualSalida: any; // o simplemente 'envio: Envio;'
  id: any;
  userId: any;
  usuarioId: any;
  riderId: any;
  valorEnvio: any;
  costoEnvio: any;
  usuarioSaldo: any;
  usuarioDeuda: any;
  saldoRider: any;
  saldoRiderFinal: any;
  deudaUsuario: any;
  deudaUsuarioFinal: any;
  rolUsuario: any;
  usuario = [];
  res = [];
  body = {};
  body2 = {};
  mostrarMenu = false; // Para controlar la visibilidad del menú
  map: any;
  direccionOrigen: any;
  direccionOrigen2: any;
  direccionOrigen3: any;
  direccionDestino: any;
  direccionDestino2: any;
  direccionDestino3: any;
  directionsRenderer = new google.maps.DirectionsRenderer();

  autocomplete: any;
  autocomplete2: any;
  mostrarMapa: boolean = false;
  directionsService = new google.maps.DirectionsService();

  mostrarFormularioCancelar: boolean = false;
  motivoCancelacion: string = '';




  constructor(private alertController: AlertController, private cookieService: CookieService, private storage: Storage, private toastController: ToastController, private router: Router, private autenthicationService: AutenthicationService, private activateRoute: ActivatedRoute, private api: ApiRestService) {
    this.storage.create();
  }

  ngOnInit() {

    this.id = this.activateRoute.snapshot.paramMap.get("id");
    console.log("leyendo id para pasar a enviopage..id", this.id);
    let cookieValue = this.cookieService.get('idRider');
    console.log("este es el contenido de la cockie: " + cookieValue);
    this.riderIdCookie = this.cookieService.get('idRider');
    console.log("este es el contenido de la riderId: " + this.riderIdCookie);
    this.loadEnvio();
    this.loadMapa();
    console.log(localStorage.getItem('USER_DATA'));
    console.log(this.storage.get('email'));
    console.log(this.storage.get('password'));
    console.log(this.storage.get('id'));



  }


  toggleFormularioCancelar() {
    this.mostrarFormularioCancelar = !this.mostrarFormularioCancelar;
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

  loadMapa() {
    this.api.getEnvioById(this.id).subscribe(
      (res) => {
        if (!res) {
          console.error('No se obtuvo una respuesta válida de la API.');
          return;
        }

        try {
          this.envio = new Envio(res);
          console.log("Envio cargado:", this.envio);
        } catch (error) {
          console.error('Error al inicializar Envio:', error);
          return;
        }

        // Verificar que las direcciones existan
        if (!this.envio.direccionOrigen || !this.envio.direccionDestino) {
          console.error('El envío no tiene direcciones válidas.');
          return;
        }

        // Convertir las direcciones de texto a coordenadas
        this.geocodeAddress(this.envio.direccionOrigen, true);
        this.geocodeAddress(this.envio.direccionDestino, false);
      },
      (error: any) => {
        console.error('Error al obtener el envío:', error);
      }
    );
  }

  geocodeAddress(address: string, isOrigen: boolean): void {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        const coordinates = {
          lat: location.lat(),
          lng: location.lng(),
        };

        if (isOrigen) {
          this.direccionOrigen = address;
          this.direccionOrigen2 = coordinates;
          console.log('Dirección de origen:', address);
          console.log('Coordenadas de origen:', this.direccionOrigen2);
        } else {
          this.direccionDestino = address;
          this.direccionDestino2 = coordinates;
          console.log('Dirección de destino:', address);
          console.log('Coordenadas de destino:', this.direccionDestino2);
        }
        this.direccionOrigen3 = [this.direccionOrigen2.lat, this.direccionOrigen2.lng];
        this.direccionDestino3 = [this.direccionDestino2.lat, this.direccionDestino2.lng];
        console.log("nuevas coor: " + this.direccionOrigen3 + "y" + this.direccionDestino3)
        // Renderizar mapa cuando ambas coordenadas estén disponibles
        if (this.direccionOrigen3 && this.direccionDestino3) {
          this.mostrarMapa = true;
          this.renderizarMapa(this.direccionOrigen3, this.direccionDestino3);
          console.log("estas son: " + this.direccionOrigen3 + "y" + this.direccionDestino3)
        }


      } else {
        console.error(`No se pudo geocodificar la dirección: ${address}`, status);
      }
    });
  }
  renderizarMapa(origin: any, destination: any) {
    console.log("Entrando a renderizar");
    console.log("Tipo de origin:", typeof origin, origin);
    console.log("Tipo de destination:", typeof destination, destination);

    // Accede a las coordenadas si origin y destination son arrays
    const originLatLng = { lat: origin[0], lng: origin[1] };
    const destinationLatLng = { lat: destination[0], lng: destination[1] };
    console.log("mostrando....:" + originLatLng)
    console.log("mostrando....:" + destinationLatLng)

    const mapOptions = {
      center: originLatLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsRenderer.setMap(this.map);

    // Crear marcadores
    const markerOrigen = new google.maps.Marker({
      position: origin = { lat: origin[0], lng: origin[1] },
      map: this.map,
      title: 'Ubicación de Origen'
    });

    const markerDestino = new google.maps.Marker({
      position: destination = { lat: destination[0], lng: destination[1] },
      map: this.map,
      title: 'Ubicación de Destino'
    });
    this.calcularRuta(origin, destination)
  }
  // Método para calcular la ruta entre el origen y el destino
  calcularRuta(origin: any, destination: any) {
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    // Realizar la solicitud de la ruta
    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        // Si la ruta es válida, renderízala en el mapa
        this.directionsRenderer.setDirections(result);
        const route = result.routes[0];
        const legs = route.legs[0]; // Considerando que hay una sola ruta y un solo tramo
        const distanceInMeters = legs.distance.value; // Distancia en metros
        const distanceInKilometers = distanceInMeters / 1000;
      } else {
        console.error('Error al calcular la ruta:', status);
      }
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



  cancelarEnvio() {
    if (!this.motivoCancelacion.trim()) {
      this.presentAlert("Error", 'Por favor, escribe un motivo para cancelar.');
      return;
    }

    this.body = { id: this.id, estado: "cancelado", riderId: this.riderIdCookie };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);
      this.body2 = { envioId: this.id, usuarioId: this.riderIdCookie, riderId: this.envio.riderId, motivoCancelacionRIder: "", motivoCancelacionGenerador: this.motivoCancelacion };
      this.api.createHistorialCancelados(this.body).subscribe((success) => {
        console.log(success);


      }, (error) => {
        console.log(error);
      });
      this.presentAlert("Cancelado", "Envío cancelado");
      this.loadEnvio();
      this.router.navigate(['wallet']);

    }, (error) => {
      console.log(error);
    });
    // Reinicia el formulario
    this.mostrarFormularioCancelar = false;
    this.motivoCancelacion = '';
  };
  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
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


