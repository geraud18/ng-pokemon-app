import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  message: string = "Vous etes deconnecter. (admin/geraud)";
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth = this.authService
  }

  setMessage(){
    if(this.authService.isLoggedIn){

      this.message = 'Vous etes connecter';

    }else{

      this.message = 'Identifiant ou mot de passe incorrect.'
    }
  }

  login(){
    this.message = "Tentative de connection en cour";
    this.authService.login(this.name, this.password)
    .subscribe((isLoggedIn: boolean) => {
      this.setMessage();
      if(isLoggedIn){
        this.router.navigate(['/pokemons'])
      }else{
        this.password = '';
        this.router.navigate(['/login'])
      }
     
    });
  }

  logout(){

    this.authService.logout();
    this.message = 'Vous etes deconnecte';

  }

}
