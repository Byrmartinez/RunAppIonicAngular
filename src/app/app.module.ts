import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { AutenthicationService } from './services/autenthication.service'
import { AuthService } from './services/auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()], providers: [AuthService, AutenthicationService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        EmailComposer // Add EmailComposer to providers
        , provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {

  constructor(public authenticationService: AutenthicationService) {

  }

  logout() {
    this.authenticationService.logout();
  }
}