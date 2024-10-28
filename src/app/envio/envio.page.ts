import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular'; // Importar AlertController

declare var google: any;

@Component({
  selector: 'app-envio',
  templateUrl: './envio.page.html',
  styleUrls: ['./envio.page.scss'],
})
export class EnvioPage implements AfterViewInit {

  map: any;
  autocomplete: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  direccionActual: string = '';
  direccionDestino: string = '';
  comentarios: string = '';
  currentPosition: any;

  constructor(private alertController: AlertController) {} // Inyectar AlertController

  ngAfterViewInit() {
    this.loadMap();
    this.initializeAutocomplete();
  }

  initializeAutocomplete() {
    const input = document.getElementById('autocomplete-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'CL' } // Limitar a Chile
    });
  
    // Asigna el lugar seleccionado al campo de dirección de destino
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        this.direccionDestino = place.formatted_address;
        console.log('Dirección de destino seleccionada:', this.direccionDestino);
      } else {
        alert('No se pudo determinar la ubicación.');
      }
    });
  }
  // Método para mostrar alertas
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para cargar el mapa con la ubicación actual
  async loadMap() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      const mapOptions = {
        center: this.currentPosition,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.directionsRenderer.setMap(this.map);

      const marker = new google.maps.Marker({
        position: this.currentPosition,
        map: this.map,
        title: 'Ubicación actual'
      });

      console.log(`Ubicación actual: ${position.coords.latitude}, ${position.coords.longitude}`);
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
      await this.mostrarAlerta('Error', 'No se pudo obtener la ubicación actual.');
    }
  }

  // Método para verificar y marcar la ruta entre la ubicación actual y la dirección destino
  async verificarDireccion() {
    if (!this.direccionDestino) {
      await this.mostrarAlerta('Advertencia', 'Por favor, ingresa una dirección de destino.');
      return;
    }

    // Usar Google Places para convertir la dirección en coordenadas
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.direccionDestino }, async (results: any, status: any) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const destination = results[0].geometry.location;

        console.log('Destino encontrado: ', destination.toString());

        // Calcular y mostrar la ruta
        this.calcularRuta(destination);
      } else {
        console.error('Error al verificar la dirección de destino:', status);
        await this.mostrarAlerta('Error', 'No se pudo encontrar la dirección de destino.');
      }
    });
  }

  // Método para calcular la ruta
  calcularRuta(destination: any) {
    const request = {
      origin: this.currentPosition,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
        console.log('Ruta calculada correctamente:', result);
      } else {
        console.error('Error al calcular la ruta:', status);
        this.mostrarAlerta('Error', 'No se pudo calcular la ruta.');
      }
    });
  }

  // Método para centrar el mapa en la ubicación actual
  async centrarMapa() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(currentLocation);

      const marker = new google.maps.Marker({
        position: currentLocation,
        map: this.map,
        title: 'Ubicación actual'
      });

      console.log(`Mapa centrado en: ${position.coords.latitude}, ${position.coords.longitude}`);
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
      await this.mostrarAlerta('Error', 'No se pudo centrar el mapa en la ubicación actual.');
    }
  }

  // Método para crear el envío
  async crearEnvio() {
    if (this.direccionDestino && this.comentarios) {
      console.log('Envío creado:', {
        direccionActual: this.currentPosition.toString(),
        direccionDestino: this.direccionDestino,
        comentarios: this.comentarios
      });
      await this.mostrarAlerta('Éxito', `Envío creado de ${this.currentPosition.toString()} a ${this.direccionDestino}`);
    } else {
      await this.mostrarAlerta('Advertencia', 'Por favor, completa todos los campos.');
    }
  }
}
