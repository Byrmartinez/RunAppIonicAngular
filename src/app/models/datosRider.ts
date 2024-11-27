// src/app/models/envio.model.ts

export class DatosRider {
    id: string;
    idUsuario: string;
    tipoVehiculo: string;
    patente: string;
    modelo: string;
    saldo: number;
    deuda: number // Podrías usar Date si deseas convertirlo a un objeto Date

    constructor(data?: any) {
        this.id = data.id;
        this.idUsuario = data.idUsuario;
        this.tipoVehiculo = data.tipoVehiculo;
        this.patente = data.patente;
        this.modelo = data.modelo;
        this.saldo = data.saldo;
        this.deuda = data.deuda;

    }
}
