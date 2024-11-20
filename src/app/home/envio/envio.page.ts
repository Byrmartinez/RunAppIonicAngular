import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Envio } from '../../models/envio.model';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { AutenthicationService } from 'src/app/services/autenthication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CookieService } from 'ngx-cookie-service';

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
  mostrarMenu = false; // Para controlar la visibilidad del menú
  constructor(private cookieService: CookieService, private storage: Storage, private toastController: ToastController, private router: Router, private autenthicationService: AutenthicationService, private activateRoute: ActivatedRoute, private api: ApiRestService) {
    this.storage.create();
  }

  ngOnInit() {

    this.id = this.activateRoute.snapshot.paramMap.get("id");
    console.log("leyendo id para pasar a enviopage..id", this.id);
    this.actualizarContadorEntrada();
    let cookieValue = this.cookieService.get('idRider');
    console.log("este es el contenido de la cockie: " + cookieValue);
    this.riderIdCookie = this.cookieService.get('idRider');
    console.log("este es el contenido de la riderId: " + this.riderIdCookie);
    this.loadEnvio();
    console.log(localStorage.getItem('USER_DATA'));
    console.log(this.storage.get('email'));
    console.log(this.storage.get('password'));
    console.log(this.storage.get('id'));
    //this.storage.get('id').then(userId => {
    //console.log('ID obtenido:', userId); // Esto debería mostrar el id como un string
    //});

  }

  /*async getUserId() {
    try {
      const id2 = await this.storage.get('id');
      this.userId = id2; // Aquí debes obtener el id en string
      console.log("Aquí debería ser el string correcto" + this.userId); // Aquí debería ser el string correcto
    } catch (error) {
      console.error("Error al obtener el ID:", error);
    }
  }*/

  loadEnvio() {
    this.api.getEnvioById(this.id).subscribe((res) => {
      //console.log("esta es la res de by id" + res)
      this.envio = new Envio(res);
      //console.log("esta es la res de by id" + this.envio)
    }, (error: any) => {
      console.log(error);
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

  actualizarContadorEntrada() {
    // Obtener el valor actual del contador desde el servidor
    this.api.getEnvioById(this.id).subscribe(
      (res) => {
        this.envioActual = new Envio(res);

        // Verificar si el estado es "pendiente"
        if (this.envioActual.estado === 'pendiente') {
          this.contadorActualEntrada = this.envioActual.contador;
          console.log("Contador actual antes de incrementar: " + this.contadorActualEntrada);

          // Incrementar el contador y actualizar en el servidor
          this.contadorActualEntrada = Number(this.contadorActualEntrada) + 1;
          console.log("Contador actual DESPUÉS de incrementar: " + this.contadorActualEntrada);

          this.body = { id: this.id, contador: this.contadorActualEntrada };
          this.api.updateEnvios(this.body).subscribe(
            (success) => {
              console.log(success);
              this.showToast("Contador actualizado +1");
              this.loadEnvio(); // Cargar datos actualizados
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log("El estado no es 'pendiente', no se incrementa el contador.");
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  actualizarContadorSalida() {
    // Obtener el valor actual del contador desde el servidor
    this.api.getEnvioById(this.id).subscribe(
      (res) => {
        this.envioActual = new Envio(res);
        this.contadorActualSalida = this.envioActual.contador;

        console.log("Contador actual antes de decrementar: " + this.contadorActualSalida);

        // Decrementar el contador y actualizar en el servidor
        this.contadorActualSalida = Number(this.contadorActualSalida) - 1;
        console.log("Contador actual despuess de decrementar: " + this.contadorActualSalida);

        this.body = { id: this.id, contador: this.contadorActualSalida };
        this.api.updateEnvios(this.body).subscribe(
          (success) => {
            console.log(success);
            this.showToast("Contador actualizado -1");
            this.loadEnvio(); // Cargar datos actualizados
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error: any) => {
        console.log(error);
      }
    );
  };
  aceptarEnvio() {
    this.body = { id: this.id, estado: "aceptado", riderId: this.riderIdCookie };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);
      this.showToast("Envío aceptado");
      this.loadEnvio();

    }, (error) => {
      console.log(error);
    });
  };
  comenzarEnvio() {
    this.body = { id: this.id, estado: "enCamino", riderId: this.riderIdCookie };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);
      this.showToast("Envío en camino");
      this.loadEnvio();

    }, (error) => {
      console.log(error);
    });
  };
  entregarEnvio() {
    this.body = { id: this.id, estado: "entregado", riderId: this.riderIdCookie };
    this.api.updateEnvios(this.body).subscribe((success) => {
      console.log(success);
      this.showToast("Envío entregado");
      this.loadEnvio();

    }, (error) => {
      console.log(error);
    });
    this.api.getEnvioById(this.id).subscribe((res) => {
      this.envioActual = new Envio(res);
      this.usuarioId = this.envioActual.usuarioId;
      console.log("este es el usuarioId dentro de entregar envio : " + this.usuarioId)
      this.riderId = this.envioActual.riderId;
      console.log("este es el riderId dentro de entregar envio : " + this.riderId)
      this.riderId = this.envioActual.riderId;
      console.log("este es el riderId dentro de entregar envio : " + this.riderId)
      this.valorEnvio = this.envioActual.valorFinal;
      console.log("este es el valorFinal dentro de entregar envio : " + this.valorEnvio)
      this.costoEnvio = this.envioActual.costo;
      console.log("este es el costo dentro de entregar envio : " + this.costoEnvio)
      this.api.getUsuarioById(this.usuarioId).subscribe(
        (res) => {
          this.rolUsuario = res.idRol;
          console.log("este es el rolUsuario dentro de entregar envio : " + this.rolUsuario)
          if (this.rolUsuario === '1') {
            this.api.getDatosRidersById(this.riderId).subscribe((res) => {
              this.usuarioSaldo = res;
              this.saldoRider = this.usuarioSaldo.saldo;
              console.log("este es el saldoRider dentro de entregar envio : " + this.saldoRider)
              this.saldoRiderFinal = Number(this.saldoRider) + Number(this.valorEnvio);
              console.log("este es el saldoRiderFinal dentro de entregar envio : " + this.saldoRiderFinal);
              this.body = { id: this.riderId, saldo: this.saldoRiderFinal };
              this.api.updateDatosRider(this.body).subscribe((success) => {
                console.log(success);
                this.showToast("Felicitaciones tu saldo aumento!");
                this.loadEnvio();

                this.api.getDatosRidersById(this.usuarioId).subscribe((res) => {
                  this.usuarioDeuda = res;
                  this.deudaUsuario = this.usuarioDeuda.deuda;
                  console.log("este es el deudaUsuario dentro de entregar envio : " + this.deudaUsuario)
                  this.deudaUsuarioFinal = Number(this.deudaUsuario) + Number(this.costoEnvio);
                  console.log("este es el deudaUsuarioFinal dentro de entregar envio : " + this.deudaUsuarioFinal);
                  this.body = { id: this.usuarioId, deuda: this.deudaUsuarioFinal };
                  this.api.updateDatosRider(this.body).subscribe((success) => {
                    console.log(success);
                    console.log("la deuda del usuario ha sido actualizada");

                    this.loadEnvio();

                  },)

                });

              }, (error) => {
                console.log(error);
              });



            },)
          }
          if (this.rolUsuario === '2') {
            this.api.getDatosRidersById(this.riderId).subscribe((res) => {
              this.usuarioSaldo = res;
              this.saldoRider = this.usuarioSaldo.saldo;
              console.log("este es el saldoRider dentro de entregar envio : " + this.saldoRider)
              this.saldoRiderFinal = Number(this.saldoRider) + Number(this.valorEnvio);
              console.log("este es el saldoRiderFinal dentro de entregar envio : " + this.saldoRiderFinal);
              this.body = { id: this.riderId, saldo: this.saldoRiderFinal };
              this.api.updateDatosRider(this.body).subscribe((success) => {
                console.log(success);
                this.showToast("Felicitaciones tu saldo aumento!");
                this.loadEnvio();

                this.api.getDatosPymesById(this.usuarioId).subscribe((res) => {
                  this.usuarioDeuda = res;
                  this.deudaUsuario = this.usuarioDeuda.deuda;
                  console.log("este es el deudaUsuario dentro de entregar envio : " + this.deudaUsuario)
                  this.deudaUsuarioFinal = Number(this.deudaUsuario) + Number(this.costoEnvio);
                  console.log("este es el deudaUsuarioFinal dentro de entregar envio : " + this.deudaUsuarioFinal);
                  this.body = { id: this.usuarioId, deuda: this.deudaUsuarioFinal };
                  this.api.updateDatosPyme(this.body).subscribe((success) => {
                    console.log(success);
                    console.log("la deuda del usuario ha sido actualizada");

                    this.loadEnvio();

                  },)

                });

              }, (error) => {
                console.log(error);
              });



            },)
          }
        }
      );

    }, (error) => {
      console.log(error);
    });

    this.router.navigate(['home']);
  };
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


