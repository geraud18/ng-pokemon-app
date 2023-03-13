import { AuthService } from './auth.service';
// NG G GUARD NAME PERMET DE RESTREINDRE L'ACCES AUTORISER VERIFIER
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log('Le guard a bien ete activer');
    let url: string = state.url;
    return this.checkLogin(url);
  }
  
  checkLogin(url: string) {
    if(this.authService.isLoggedIn){
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);

    return false;
  }
  
}
