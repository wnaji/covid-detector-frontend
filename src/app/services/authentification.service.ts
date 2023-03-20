import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { loginData } from '../models/login-data.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { doctorData } from '../models/doctor-data.model';
import { establishmentData } from '../models/establishment-data.model';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class AuthentificationService {
  private isAuthenticated: boolean = false;
  private authenticationStatusListener = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getIsAuthenticated(){
    return this.isAuthenticated;
  }

  getAuthenticationStatusListener() {
    return this.authenticationStatusListener.asObservable();
  }

  login(username: string, password: string) {
    const loginData: loginData = {
      username: username,
      password: password,
    };

    this.http
      .post<{ token: string; account: any }>(
        environment.serverUrl + 'login',
        loginData
      )
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('account', JSON.stringify(response.account));
          
          this.isAuthenticated = true;
          this.authenticationStatusListener.next(true);

          if (response.account.establishment !== undefined) {
            this.router.navigate(['/establishment']);
          } else {
            this.router.navigate(['/doctor']);
          }

          this.toastr.success('Bienvenue!');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404 || error.status === 401) {
            this.toastr.error("Mot de passe/nom d'utilisateur incorrect");
          } else {
            this.toastr.error('Impossible de se connecter');
          }
        }
      );
  }

  logout(){
    this.isAuthenticated = false;
    this.authenticationStatusListener.next(false);
    
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    
    this.router.navigate(['/']);
    this.toastr.info('Vous vous êtes déconnecté');
  }

  register(accountType: string, username: string, password: string, firstname: string, lastname: string, name: string) {
    if (accountType === 'Docteur') {
      const doctor: doctorData = {
        username,
        password,
        doctor: {
          first_name: firstname,
          last_name: lastname,
        },
      };
      this.doPostRegister(doctor);
    } else if (accountType === 'Établissement') {
      const establishment: establishmentData = {
        username,
        password,
        establishment: {
          name: name,
        },
      };
      this.doPostRegister(establishment);
    } else {
      this.toastr.error('invalid account type !');
      return; //inutile ??
    }
  }

  doPostRegister(data: any) {
    this.http
      .post<{ token: string; account: any }>(environment.serverUrl + 'register', data)
      .subscribe(
        (response) => {
          this.isAuthenticated = true;
          this.authenticationStatusListener.next(true);

          localStorage.setItem('token', response.token);
          localStorage.setItem('account', JSON.stringify(response.account));

          if (response.account.establishment !== undefined) {
            this.router.navigate(['/establishment']);
          } else {
            this.router.navigate(['/doctor']);
          }

          this.toastr.success('Bienvenue!');
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message);
        }
      );
  }

  autoAuthenficationUser(){
    if(localStorage.getItem("token")== null){ //==null inutile ?
      this.isAuthenticated = false;
    }
    else{
      this.isAuthenticated = true;
      this.authenticationStatusListener.next(true);
    }
  }
}
