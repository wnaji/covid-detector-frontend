import { Injectable, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service'
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

@Injectable({
  providedIn : 'root'
})
export class NavbarComponent implements OnInit, OnDestroy{
  title = 'pfe-web-frontend';
  afficherBoutonLg:boolean = false;
  isAuthenticated: boolean = false;
  private authenticationListenerSubscription!: Subscription;

  constructor( private authService : AuthentificationService, private router: ActivatedRoute) {
    router.params.subscribe(val => {
      this.isAuthenticated = this.authService.getIsAuthenticated();
      this.authenticationListenerSubscription = this.authService.getAuthenticationStatusListener().subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
    
        if(this.isAuthenticated) this.afficherBoutonLg = true;
        if(!this.isAuthenticated) this.afficherBoutonLg = false;
      
      })
    })
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.authenticationListenerSubscription.unsubscribe();
  }
  
  logout(){
    this.authService.logout();
  }

  public btnLg() {
    if(localStorage.getItem('token') !== undefined)
      return this.afficherBoutonLg=true;
    else
      return this.afficherBoutonLg=false;
  }
}