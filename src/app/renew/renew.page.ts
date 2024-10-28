import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx'; // Asegúrate de tener este plugin instalado

@Component({
  selector: 'app-renew',
  templateUrl: './renew.page.html',
  styleUrls: ['./renew.page.scss'],
})
export class RenewPage {
  selectedPlan: string = '';  // Variable para almacenar el plan seleccionado
  mostrarMenu = false;
  currentSegment: string = 'wallet-emp';  // Controla el estado del segmento de navegación

  constructor(private router: Router, private emailComposer: EmailComposer, private http: HttpClient) {}

  renovar() {
    if (!this.selectedPlan) {
      alert('Por favor, seleccione un plan antes de renovar.');
      return;
    }

    // Prepara el correo
    const email = {
      to: 'cgramirez92@gmail.com',
      subject: 'Renovación de suscripción',
      body: `El cliente ha seleccionado el plan ${this.selectedPlan} para renovar su suscripción.`,
      isHtml: true
    };

    // Envía el correo
    this.emailComposer.open(email).then(() => {
      alert('Correo enviado con éxito. Le hemos enviado los detalles para la transferencia.');
    }).catch((error) => {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo. Por favor, intente nuevamente.');
    });
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  navigate(page: string) {
    this.mostrarMenu = false;
    this.router.navigate([`/${page}`]);
  }

  cerrarSesion() {
    console.log('Cerrando sesión');
  }
}
