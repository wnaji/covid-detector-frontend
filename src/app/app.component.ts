import { Component } from '@angular/core';
import { AuthentificationService } from './services/authentification.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor (private authenticationService: AuthentificationService) {
  }

  ngOnInit() {
    this.authenticationService.autoAuthenficationUser();
  }
}