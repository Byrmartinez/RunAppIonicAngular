import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup-emp',
  templateUrl: './signup-emp.page.html',
  styleUrls: ['./signup-emp.page.scss'],
})
export class SignupEmpPage implements OnInit {

  modeloNombreEmpresa: string = '';
  modeloCorreoEmpresa: string = '';
  modeloPlan: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  // Método para registrar la empresa
  async registrarEmpresa() {
    if (this.modeloNombreEmpresa.trim() === '' || this.modeloCorreoEmpresa.trim() === '' || this.modeloPlan === '') {
      this.presentAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    // Aquí iría la lógica de registro, como enviar los datos a un servidor
    this.presentAlert('Éxito', 'Empresa registrada correctamente.');
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
