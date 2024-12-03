import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ApiRestService } from '../services/api-rest.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { AutenthicationService } from '../services/autenthication.service';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Usuarios = [];
  type: boolean = true;
  password: string = '';
  email: string = '';
  idUsuario: string = '';
  rolUsuario: any;

  authState = new BehaviorSubject(false);

  constructor(
    private cookieService: CookieService,
    private alertController: AlertController,
    public navController: NavController,
    public menuCtrl: MenuController,
    private api: ApiRestService,
    private router: Router,
    private storage: Storage,// Inyectar Storage
    private authenticationService: AutenthicationService

  ) {
    this.storage.create();
  }

  async ngOnInit() {
    // Inicializar el almacenamiento
    await this.storage.create();
    this.authenticationService.isLogged();

    // Comprobar si hay credenciales guardadas
    const storedEmail = await this.storage.get('email');
    const storedPassword = await this.storage.get('password');
    console.log(localStorage.getItem('USER_DATA'))

    if (storedEmail && storedPassword) {
      this.email = storedEmail;
      this.password = storedPassword;
      this.login(); // Iniciar sesión automáticamente si hay credenciales guardadas
    }
  }

  async login() {


    this.api.login(this.email, this.password).subscribe(
      async (response) => {
        this.rolUsuario = response.idRol
        if (this.rolUsuario === "1") {
          this.idUsuario = response.id
          console.log('Login exitosooooooo:', response);
          console.log('response id:', response.id, this.idUsuario);
          this.cookieService.set('idRider', this.idUsuario);
          let cookieValue = this.cookieService.get('idRider');
          console.log("este es el contenido de la cockie: " + cookieValue); // Muestra el valor de la cookie


          // Almacenar las credenciales para mantener la sesión
          await this.storage.set('email', this.email);
          await this.storage.set('password', this.password);
          await this.storage.set('UserId', this.idUsuario);
          this.authState.next(true);
          this.authenticationService.authState.next(true); // Actualizar el estado de autenticación en el servicio
          console.log('Intentando navegar al home');
          console.log(this.storage);
          console.log("valor austhstate en login page: " + this.authState.value);

          // Redirigir al usuario a la página de inicio
          this.router.navigate(['home']);
        }
        if (this.rolUsuario === "2") {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Eres usuario Pyme, debes descargar la app version PYME para iniciar sesión.',
            buttons: ['OK'],
          });
          await alert.present();
        }

      },
      async (error) => {
        console.error('Error en el login:', error, this.email, this.password);
        // Mostrar un mensaje de error al usuario
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Credenciales incorrectas.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  changeType() {
    this.type = !this.type;
  }
}


/*this.api.getUsuarios().subscribe((res) => {
  this.Usuarios = res;
  console.log(this.Usuarios)
}, (error) => {
  console.log(error);
});*/