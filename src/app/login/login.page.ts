import { Component, OnInit } from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: boolean =true;
  modeloContrasena: string = '';

  constructor( private alertController: AlertController,public navController:NavController,public menuCtrl:MenuController) { }

  ngOnInit(): void {
    this.menuCtrl.enable(false);
  }

changeType(){
  this.type =!this.type;
}}