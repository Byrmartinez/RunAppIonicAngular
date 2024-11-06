import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  modeloNombre: string = '';
  modeloCorreo: string = '';
  modeloContrasena: string = '';
  modeloTelefono: string = '';

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() { }

  // Validación de campos y redirección
  async validarRegistro(tipoCuenta: string) {
    if (this.modeloNombre.trim() === '' || this.modeloCorreo.trim() === '' || this.modeloTelefono.trim() === '' || this.modeloContrasena.trim() === '') {
      this.presentAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (this.modeloContrasena.length < 8) {
      this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Redirigir según el tipo de cuenta (rider o empresa)
    if (tipoCuenta === 'rider') {
      this.router.navigate(['/signup-rider']);
    } else if (tipoCuenta === 'empresa') {
      this.router.navigate(['/signup-emp']);
    }


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
