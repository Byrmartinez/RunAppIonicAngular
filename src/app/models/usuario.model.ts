export class Usuario {
    id: string;
    nombre: string;
    email: string;
    password: string;
    telefono: string;
    estado: string;
    idRol: string;
    fechaCreacion: Date

    constructor(data?: any) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.email = data.email;
        this.password = data.password;
        this.telefono = data.telefono;
        this.estado = data.estado;
        this.idRol = data.idRol;
        this.fechaCreacion = data.fechaCreacion;
    }
}   