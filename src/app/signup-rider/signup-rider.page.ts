import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup-rider',
  templateUrl: './signup-rider.page.html',
  styleUrls: ['./signup-rider.page.scss'],
})
export class SignupRiderPage implements OnInit {

  modeloTipoVehiculo: string = '';
  modeloPlaca: string = '';
  modeloModeloVehiculo: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() { }

  // Método para registrar al rider
  async registrarRider() {
    if (this.modeloTipoVehiculo.trim() === '' || this.modeloPlaca.trim() === '' || this.modeloModeloVehiculo.trim() === '') {
      this.presentAlert('Error', 'Todos los campos son obligatorios.');
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
