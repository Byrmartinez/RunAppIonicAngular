import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenthicationService } from './autenthication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public authenticationService: AutenthicationService,
    public router: Router
  ) { }
  async canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authenticationService.authState.subscribe((isAuth) => {
        console.log('¿Usuario autenticado en canActivate?:', isAuth);
        if (isAuth) {
          resolve(true);
        } else {
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}