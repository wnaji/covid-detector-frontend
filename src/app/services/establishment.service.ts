import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr'
import { environment} from '../../environments/environment';
import { locationData } from '../models/location-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getLocations(): Observable<[]> {
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  token || ''});
    let options = { headers: headers };
    return this.http.get<[]>(environment.serverUrl+'establishments/locations', options)
  }
  
  async createLocation(name : string, description: string) {
    const account = JSON.parse(localStorage.getItem("account") || '{}');
    const token = localStorage.getItem("token");
    const locationData : locationData ={
      name: name,
      description : description,
      establishment:{
        id: account.establishment.id,
        name: account.establishment.name
      }
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  token || ''});
    let options = { headers: headers };
    //requete vers la Db
    await this.http.post(environment.serverUrl+'establishments/locations', locationData, options).toPromise()
  }
}
