// CLIENT HTTP QUI REQUETE LES SERVEUR DISTANTS
// npm install angular-in-memory-web-api --save-dev SIMULER UN SERVER DISTANT SUR L'APP
// ng build PREPARE LE PROJET POUR ETRE MIS EN PROJET EN PRODUCTION 
// CREER UN LIVRABLE 
// firebase cli QUI PERMET DE DEPLOYER FACILEMENT LES APPLICATION SUR LES SERVER DE FIREBASE
// QUI PERMET D'UTILISER LES COMMANDES DE FIREBASE EN CMD
// npm install -g firebase-tools
// firebase --version 
// firebase login PERMET DE LIER NOTRE CLI A NOTRE COMPTE FIREBASE
// firebase init PERMET DE FAIRE CORRESPONDRE NOTRE EN LOCAL AU PROJET EN LIGNE
// firebase deploy DEPLOIE NOTRE APPLICATION EN LIGNE
// LIEN DE L'APPLICATION https://ng-pokemon-app-5e8ac.web.app
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { InMemoryDataService } from './in-memory-data.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false}),
    PokemonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
