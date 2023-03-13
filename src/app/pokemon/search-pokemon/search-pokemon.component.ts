import { PokemonService } from './../pokemon.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  // TRANSFORMER LE SEARCHTERMS EN UN FLUX DE RESULTAT POKEMONS$


  // REPRESENTE UN FLUX DE DONNEES DANS LE TEMPS AVEC LE TERME A RECHERCHER
  // SUBJECT EST COMME UN OBSERVABLE MAIS DIFFERE D'UN OBSERVABLE QUI NE PEUT QUE ETRE SOUSCRIBE POUR RECEVOIR DES DONNEES
  // MAIS NOUS ON VEUT LE PILOTE D'OU UTILISATION DE SUBJECT QUI NOUS PERMET DE CONSTRUIRE LE FLUX DE DONNEES ET EFFECTUER DES OPERATIONS DESSUS
  searchTerms = new Subject<string>();

  // CONSTRUIRE UNE FLUX AVEC LA LISTER DES RESLUTATS DEMANDER PAR L'UTILISATEUR
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    // ATTENDRE UN CERTAINS TEMPS AVANT DE LANCER LA RECHERCHER
    // L'OBSERVABLE DEBOUNCETIME PERMET D'ELIMINER LES REQUETES APRES NOMBRE UN  DE SECONDE DONNEES 
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      // L'OPERATEUR DISTINCTUNTILSCHANGES ELIMINE LES REQUETES QUI SONT SUCINSTEMENT IDENTIQUE
      distinctUntilChanged(),

      // TRANSFORMER UN TERMES DE RECHERCHES EN RESULTATA
      // CONCATMAP / MERGEMAP / SWICHTMAP
      // EFFECTUER UNIQUEMENT LA RECHERCHE LA PLUS RECENTE
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  // ENVOYER DES DONNEES DANS NOTRE FLUX DE DONNEES GRACE A NEXT
  // SEARCH EST UTILISER A CHAQUE FOIS QU'ON SAISIE DU TEXTE
  search(term: string){
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
