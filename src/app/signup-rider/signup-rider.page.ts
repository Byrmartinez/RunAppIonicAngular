import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup-rider',
  templateUrl: './signup-rider.page.html',
  styleUrls: ['./signup-rider.page.scss'],
})
export class SignupRiderPage implements OnInit {

  TipoVehiculo: string = '';
  Patente: string = '';
  ModeloVehiculo: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() { }

  // Método para registrar al rider
  async registrarRider() {
    if (this.TipoVehiculo.trim() === '' || this.Patente.trim() === '' || this.ModeloVehiculo.trim() === '') {
      this.presentAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    // Validación de formato de la placa (3 letras seguidas de 2 números)
    const placaPattern = /^[A-Za-z]{3}[0-9]{2}$/;
    if (!placaPattern.test(this.Patente)) {
      this.presentAlert('Error', 'La placa debe tener el formato de 3 letras seguidas de 2 números (ej. ABC12).');
      return;
    }

    // Aquí iría la lógica de registro, como enviar los datos a un servidor
    this.presentAlert('Éxito', 'Rider registrado correctamente.');
  }

  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
