import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutenthicationService {

  authState = new BehaviorSubject(false);
  apiUrl = 'http://localhost:3000/usuarios/login'

  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    public toastController: ToastController
  ) {
    this.initializeStorage();
  }
  async initializeStorage() {
    await this.storage.create();
    this.isLogged();
  }
  /**
   * Verifica si existe una sesión iniciada.
   */
  async isLogged() {
    console.log('Ejecutando isLogged()...');
    const response = await this.storage.get("USER_DATA");
    console.log('Resultado de USER_DATA en isLogged:', response);
    if (response != null) {
      this.authState.next(true);
      console.log('authState después de setear true en isLogged:', this.authState.value);
    } else {
      this.authState.next(false);
      console.log('authState después de setear false en isLogged:', this.authState.value);
    }
  }
  /**
   * Cierra la sesión del usuario actual.
   */
  logout() {
    this.storage.get("USER_DATA").then((data) => {
      if (data) {
        data.active = 0;
        console.log("el data active es : " + data.active);
        this.storage.remove("USER_DATA");
      } else {
        console.log("No se encontró USER_DATA en el almacenamiento.");
      }

      this.authState.next(false);
      console.log("el estado de authstate queda como : " + this.authState.value);
      this.router.navigate(['login']);
    }).catch((error) => {
      console.error("Error al obtener USER_DATA:", error);
    });
  }

  /**
   * Inicia sesión obteniendo los usuarios de la API y verificando las credenciales en el cliente.
   */
  login(credentials: { email: string, password: string }) {
    this.http.get<any[]>(this.apiUrl).subscribe(
      async (users) => {
        const usuario = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (usuario) {
          console.log("aqui veo el id de usuario ene l login: " + usuario.id)
          await this.storage.set("USER_DATA", usuario);
          // Guarda los datos del usuario autenticado
          console.log('USER_DATA guardado:', await this.storage.get("USER_DATA"));
          this.authState.next(true);
          console.log('Usuario autenticado y almacenado:', usuario);
          console.log('USER_DATA guardado:', await this.storage.get("USER_DATA"));
          this.router.navigate(['home']);

        } else {
          this.presentToast("Credenciales usaaando Incorrectas");
        }
      },
      (error) => {
        console.error(error);
        this.presentToast("Error de conexión");
      }
    );


  }
  async getUserId(): Promise<string | null> {
    const userData = await this.storage.get("USER_DATA");
    console.log("esta seria la userdata" + userData)
    return userData ? userData.UserId.value : null; // Asegúrate de que 'id' es el nombre correcto del campo en tu objeto
  }


  /**
   * Muestra un mensaje de notificación.
   */
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration || 2000
    });
    toast.present();
  }

  /**
   * Devuelve el estado de autenticación actual.
   */
  async isAuthenticated(): Promise<boolean> {
    const userData = await this.storage.get("USER_DATA");
    this.authState.next(userData != null);
    return this.authState.value;
  }
}
