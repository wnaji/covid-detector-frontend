import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentGuard implements CanActivate {

  constructor(private router: Router) { }

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
      return true;
    else if (accountJson.doctor)
      return this.router.navigate(["/doctor"])

    return this.router.navigate(["/notfound"])
  }

}
