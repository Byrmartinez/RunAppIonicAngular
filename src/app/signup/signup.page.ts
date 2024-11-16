import { ApiRestService } from 'src/app/services/api-rest.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  body = {};
  // Propiedades
  Nombre: string = '';
  Email: string = '';
  Contrasena: string = '';
  Telefono: string = '';
  Estado: string = '';
  IdRol: string = '';

  TipoVehiculo: string = '';
  Patente: string = '';
  ModeloVehiculo: string = '';
  Saldo: number = 0;
  Deuda: number = 0;

  // Constructor
  constructor(private api: ApiRestService, private alertController: AlertController, private router: Router) { }

  // Ciclo de vida del componente
  ngOnInit() { }

  // Métodos principales
  async registrarRider() {
    if (this.camposVacios()) {
      this.presentAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (!this.validarEmail()) {
      this.presentAlert('Error', 'Por favor ingrese un correo electrónico válido.');
      return;
    }

    if (!this.validarTelefono()) {
      this.presentAlert('Error', 'Por favor ingrese solo números en el campo de teléfono.');
      return;
    }

    if (!this.validarContrasena()) {
      this.presentAlert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!this.validarPlaca()) {
      this.presentAlert(
        'Error',
        'La placa debe tener el formato de 3 letras seguidas de 2 números (ej. ABC12).'
      );
      return;
    }

    this.onTelefonoChange();
    this.body = { nombre: this.Nombre, email: this.Email, password: this.Contrasena, telefono: this.Telefono, estado: "activo", idRol: "1" };
    this.api.createUsuario(this.body).subscribe((success) => {
      console.log('Usuario creado:', success);

      // Llamar al método para obtener el usuario por email
      this.api.getUsuarioByEmail(this.Email).subscribe(
        (usuario) => {
          console.log('Usuario obtenido:', usuario);

          // Extraer el ID del usuario
          const idUsuario = usuario.id; // Asegúrate de que 'id' sea la propiedad correcta en la respuesta

          // Crear el registro en datos_rider
          const datosRiderBody = {
            idUsuario: idUsuario,
            tipoVehiculo: this.TipoVehiculo,
            patente: this.Patente,
            modelo: this.ModeloVehiculo,
            saldo: this.Saldo,
            deuda: this.Deuda            // Agregar otros campos necesarios para la tabla datos_rider
          };

          this.api.createDatosRider(this.body = datosRiderBody).subscribe(
            (success) => {
              console.log('Datos rider registrados:', success);
              this.presentAlert('Éxito', 'Rider registrado correctamente.');
            },
            (error) => {
              console.error('Error al registrar datos rider:', error);
              // Eliminar el usuario si falla la creación de datos rider
              this.api.deleteUsuario(idUsuario).subscribe(
                () => {
                  console.log('Usuario eliminado tras error en datos rider.');
                  this.presentAlert(
                    'Error',
                    'No se pudieron registrar los datos del rider. El usuario creado ha sido eliminado.'
                  );

                },
                (deleteError) => {
                  console.error('Error al eliminar usuario:', deleteError);
                  this.presentAlert(
                    'Error',
                    'No se pudieron registrar los datos del rider y hubo un error al intentar eliminar el usuario.'
                  );
                }

              );
            }
          );
        },
        (error) => {
          console.error('Error al obtener usuario por email:', error);
          this.presentAlert('Error', 'No se pudo encontrar al usuario recién creado.');
        }
      );


    }, (error) => {
      console.log(error);
    });
    this.presentAlert('Éxito', 'Rider registrado correctamente.');
  }



  // Métodos auxiliares
  private camposVacios(): boolean {
    return (
      this.Nombre.trim() === '' ||
      this.Email.trim() === '' ||
      this.Telefono.trim() === '' ||
      this.Contrasena.trim() === '' ||
      this.TipoVehiculo.trim() === '' ||
      this.Patente.trim() === '' ||
      this.ModeloVehiculo.trim() === ''
    );
  }

  private validarEmail(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.Email);
  }

  private validarTelefono(): boolean {
    const phonePattern = /^\+569[0-9]{8}$/;
    return phonePattern.test(this.Telefono);
  }

  private validarContrasena(): boolean {
    return this.Contrasena.length >= 8;
  }

  private validarPlaca(): boolean {
    const placaPattern = /^[A-Za-z]{3}[0-9]{2}$/;
    return placaPattern.test(this.Patente);
  }

  onTelefonoChange() {
    const sanitizedInput = this.Telefono.replace(/\D/g, '');
    if (sanitizedInput.length === 8 && !sanitizedInput.startsWith('+569')) {
      this.Telefono = `+569${sanitizedInput}`;
    }
  }

  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
