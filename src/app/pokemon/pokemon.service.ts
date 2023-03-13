import { catchError, Observable, of, tap } from 'rxjs';
// ng g service nameModule/name CREATION D'UN SERVICE
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';

// INDIQUE QUE NOTRE SERVICE PEUT LUI MEME AVOIR DES DEPENDANCES ET PEUT ETRE INJECTER AILLEURS
// PROVIDEDIN ROOT PERMET DE DIRE QU'ON VA UTILISER LA MEME INSTANCE DU SERVICE DANS TOUTE L'APPLICATION
// RENDRE LE SERVICES ACCESSIBLE UNIQUEMET POUR UN MODULE EN PARTICULIER IL FAUT RETIRER LE PROVIDEDIN ET GARDER LE DECORATEUR PUIS AJOUTER LE SERVICES DANS LE PROVIDER DU MODULE
@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient
  ){

  }

  // L'ON RECOIT UNE DONNER QUI ARRIVE DANS LE TEMPS ET QUI CONTIENT UN TABLEAU DE POKEMONS
  getPokemonList(): Observable<Pokemon[]> {
   // return POKEMONS;
   return this.http.get<Pokemon[]>('api/pokemons').pipe(
    // A CHAQUE FOIS L'ON VAS LOGER LA REPONSE ET SI IL Y A UNE ERREUR AFFICHER CETTE DERNIERE ET RETOURNER UN TABLEAU VIDE
    // TAP EST EQUIVALENT D'UN CONSOLE LOG PRPRE AU OBSERVABLE
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, []))
   );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined>{
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    // AJOUTER UN HEADER QUI VAS CONTENIR LES DONNEES QUE L'ON VEUT ENVOYER
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    // AJOUTER UN HEADER QUI VAS CONTENIR LES DONNEES QUE L'ON VEUT ENVOYER
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }


  searchPokemonList(term: string): Observable<Pokemon[]> {

    if(term.length <=1 ) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    )
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    // CONSOLE ERROR MESSAGE EN ROUGE
    console.error(error);
    // OF TRANSFORME UNE DONNEE SIMPLE EN UN FLUX DE DONNEE AVEC CEUX QUI EST EN PARAMETRE
    return of(errorValue);
  }

  getPokemonTypeList(): string[]{
    return [
      'Plante', 'Feu',
      'Eau', 'Insecte', 
      'Normal', 'Electrik', 
      'Poison', 'Fée', 
      'Vol', 'Combat', 'Psy'
  ];
  }

}
