import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from '../../services/authentification.service'
@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  constructor(private router: Router, authentificationService: AuthentificationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("token") == null) {
      return this.router.navigate(["/"])
    }

    const account = localStorage.getItem("account");
    if (account === null)
      this.router.navigate(["/notfound"])

    const accountJson = JSON.parse(account || "");
    if (accountJson.establishment)
      return this.router.navigate(["/establishment"])
    else if (accountJson.doctor)
      return true;

    return this.router.navigate(["/notfound"])
  }

}
