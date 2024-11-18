// src/app/models/envio.model.ts

export class Envio {
    id: string;
    usuarioId: string;
    riderId: string;
    contador: number;
    direccionOrigen: string;
    direccionDestino: string;
    descripcion: string;
    distanciaKM: number;
    estado: string;
    tipoEnvio: string;
    costo: number;
    comisionAplicacion: number;
    comisionRider: number;
    valorFinal: number;
    fechaEnvio: string; // Podrías usar Date si deseas convertirlo a un objeto Date

    constructor(data?: any) {
        this.id = data.id;
        this.usuarioId = data.usuarioId;
        this.riderId = data.riderId;
        this.contador = data.contador;
        this.direccionOrigen = data.direccionOrigen;
        this.direccionDestino = data.direccionDestino;
        this.descripcion = data.descripcion;
        this.distanciaKM = data.distanciaKM;
        this.estado = data.estado;
        this.tipoEnvio = data.tipoEnvio;
        this.costo = data.costo;
        this.comisionAplicacion = data.comisionAplicacion;
        this.comisionRider = data.comisionRider;
        this.valorFinal = data.valorFinal;
        this.fechaEnvio = data.fechaEnvio;
    }
}
