import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { Router } from '@angular/router';
import { ApiRestService } from '../services/api-rest.service';
import { AutenthicationService } from '../services/autenthication.service';
import { Envio } from '../models/envio.model';
import { CookieService } from 'ngx-cookie-service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.page.html',
  styleUrls: ['./indicadores.page.scss'],
})
export class IndicadoresPage implements OnInit {

  envios: Envio[] = [];
  enviosPendientes: Envio[] = [];
  enviosAceptados: Envio[] = [];
  enviosEncamino: Envio[] = [];
  enviosEntregados: Envio[] = [];
  id: any
  envio: any; // o simplemente 'envio: Envio;'
  userId: any;
  riderId: any;
  usuario = [];
  body = {};
  body2 = {};
  mostrarMenu = false; // Para controlar la visibilidad del menú
  estado: string = "";
  //nuevo
  pendingCount = 0;
  acceptedCount = 0;
  inTransitCount = 0;
  deliveredCount = 0;
  //nuevo
  saldo: any;
  deuda: any;
  response = [];
  // Variable para las ganancias totales
  gananciasTotales: number = 0;
  gananciasHoy: number = 0;
  gananciasSemana: number = 0;
  gananciasMes: number = 0;
  // Nuevas variables para los gráficos
  gananciasPorFecha = [];

  // Variables para envíos filtrados por fecha
  enviosHoy: any[] = [];
  enviosSemana: any[] = [];
  enviosMes: any[] = [];



  constructor(private cookieService: CookieService, private router: Router, private api: ApiRestService, private autenthicationService: AutenthicationService) { }

  async ngOnInit() {

    this.cargarEnvios();
    let cookieValue = this.cookieService.get('idRider');
    console.log("este es el contenido de la cockie: " + cookieValue);
    this.riderId = this.cookieService.get('idRider');
    console.log("este es el contenido de la riderId: " + this.riderId);
    this.api.getDatosRidersById(this.riderId).subscribe((response) => {
      this.saldo = response.saldo;
      console.log("el saldo despues de la consulta es> " + this.saldo)
      console.log("el saldo despues de la consulta es> " + this.response)
      this.deuda = response.deuda;
      console.log("la deuda despues de la consulta es> " + this.deuda)
    }, (error) => {
      console.log(error);
    });

  }
  cargarEnvios() {
    this.api.getEnvios().subscribe((res: any[]) => {
      this.envios = res.map(data => new Envio(data));
      console.log(this.envios)
      this.updateEnviosCount();


    }, (error) => {
      console.log(error);
    });
  }
  updateEnviosCount() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    this.pendingCount = this.envios.filter(envio => envio.estado === 'pendiente' && envio.riderId === this.riderId).length;
    this.enviosPendientes = this.envios.filter(envio => envio.estado === 'pendiente' && envio.riderId === this.riderId);

    this.acceptedCount = this.envios.filter(envio => envio.estado === 'aceptado' && envio.riderId === this.riderId).length;
    this.enviosAceptados = this.envios.filter(envio => envio.estado === 'aceptado' && envio.riderId === this.riderId);

    this.inTransitCount = this.envios.filter(envio => envio.estado === 'enCamino' && envio.riderId === this.riderId).length;
    this.enviosEncamino = this.envios.filter(envio => envio.estado === 'enCamino' && envio.riderId === this.riderId);

    this.deliveredCount = this.envios.filter(envio => envio.estado === 'entregado' && envio.riderId === this.riderId).length;
    this.enviosEntregados = this.envios.filter(envio => envio.estado === 'entregado' && envio.riderId === this.riderId);
    console.log("estos son los pendingCount: " + this.pendingCount)
    console.log("estos son los acceptedCount: " + this.acceptedCount)
    console.log("estos son los inTransitCount: " + this.inTransitCount)
    console.log("estos son los deliveredCount: " + this.deliveredCount)
    // Calcular ganancias del rider
    const gananciasArray = this.enviosEntregados.map(envio => Number(envio.valorFinal) || 0); // Devuelve 0 si valorFinal es nulo o undefined

    // Sumar el array de ganancias
    this.gananciasTotales = gananciasArray.reduce((total, ganancia) => total + ganancia, 0);

    console.log("Estas son las ganancias totales: " + this.gananciasTotales);
    // Filtrar las ganancias por hoy, semana y mes
    const fechaHoy = new Date();
    const inicioSemana = new Date(fechaHoy);
    inicioSemana.setDate(fechaHoy.getDate() - fechaHoy.getDay()); // Obtener el primer día de la semana
    const inicioMes = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth(), 1); // Primer día del mes

    // Filtrar ganancias por hoy
    this.gananciasHoy = this.filtrarGananciasPorFecha(fechaHoy, fechaHoy);

    // Filtrar ganancias por semana
    this.gananciasSemana = this.filtrarGananciasPorFecha(inicioSemana, fechaHoy);

    // Filtrar ganancias por mes
    this.gananciasMes = this.filtrarGananciasPorFecha(inicioMes, fechaHoy);

    console.log("Ganancias Totales: ", this.gananciasTotales);
    console.log("Ganancias Hoy: ", this.gananciasHoy);
    console.log("Ganancias Semana: ", this.gananciasSemana);
    console.log("Ganancias Mes: ", this.gananciasMes);

    // Filtrar envíos por fecha
    this.enviosHoy = this.enviosEntregados.filter(envio => {
      const envioFecha = new Date(envio.fechaEnvio);
      return envioFecha.toDateString() === today.toDateString();
    });

    this.enviosSemana = this.enviosEntregados.filter(envio => {
      const envioFecha = new Date(envio.fechaEnvio);
      return envioFecha >= startOfWeek && envioFecha <= today;
    });

    this.enviosMes = this.enviosEntregados.filter(envio => {
      const envioFecha = new Date(envio.fechaEnvio);
      return envioFecha >= startOfMonth && envioFecha <= today;
    });
    this.cargarGraficoEnvios();
  }
  // Filtrar las ganancias según el intervalo de fechas
  filtrarGananciasPorFecha(fechaInicio: Date, fechaFin: Date): number {
    return this.enviosEntregados.filter(envio => {
      const fechaEnvio = new Date(envio.fechaEnvio);
      return fechaEnvio >= fechaInicio && fechaEnvio <= fechaFin;
    }).reduce((total, envio) => total + (Number(envio.valorFinal) || 0), 0);
  }

  doRefresh(event: any) {
    this.cargarEnvios();
    this.cargarGraficoEnvios();
    this.updateEnviosCount();
  }
  cargarGraficoEnvios() {
    const ctx = document.getElementById('gananciasChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Semana', 'Mes'],
        datasets: [{
          label: 'Ganancias por Intervalo',
          data: [this.gananciasSemana, this.gananciasMes],
          backgroundColor: ['#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });

    const ctx1 = document.getElementById('enviosChart') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Pendientes', 'Aceptados', 'En Camino', 'Entregados'],
        datasets: [
          {
            label: 'Envíos por Estado',
            data: [this.pendingCount, this.acceptedCount, this.inTransitCount, this.deliveredCount],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
          }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });

    const ctx2 = document.getElementById('gananciasChartdsm') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Ganancias Totales'],
        datasets: [
          {
            label: 'Ganancias',
            data: [this.gananciasTotales],
            backgroundColor: ['#4CAF50'],
          }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });

    const ctx3 = document.getElementById('enviosFechaChart') as HTMLCanvasElement;
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Hoy', 'Esta Semana', 'Este Mes'],
        datasets: [
          {
            label: 'Envíos por Fecha',
            data: [this.enviosHoy.length, this.enviosSemana.length, this.enviosMes.length],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } } }
    });
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

