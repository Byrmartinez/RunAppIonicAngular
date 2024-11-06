import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutenthicationService } from '../services/autenthication.service';

@Component({
  selector: 'app-firstload',
  templateUrl: './firstload.page.html',
  styleUrls: ['./firstload.page.scss'],
})
export class FirstloadPage implements OnInit {

  constructor(public authenticationService: AutenthicationService, private router: Router, private loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    console.log("estamosaquii")
    setTimeout(() => {
      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });

    }, 8000);
  }

}