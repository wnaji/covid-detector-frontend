import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("token") !== null) {
      const account = localStorage.getItem("account");
      if (account === null)
        this.router.navigate(["/notfound"])

      const accountJson = JSON.parse(account || "");
      if (accountJson.establishment)
        this.router.navigate(["/establishment"])
      else if (accountJson.doctor)
        this.router.navigate(["/doctor"])
      else
        this.router.navigate(["/notfound"])
      return false;
    }

    return true;
  }

}
