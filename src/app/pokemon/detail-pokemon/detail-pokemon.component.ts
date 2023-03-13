// ng g component name --inline-template=false PERMET DE CREER UN NOUVEAU COMPOSANT AVEC LE TEMPLATE SEPARER DU TYPESCRIPT(SINON SANS LE INLINE)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [
  ]
})
export class DetailPokemonComponent implements OnInit {

  pokemon: Pokemon|undefined;

  // INJECTER LE SERVICE POUR PILOTER LES ROUTES (AVOIR ACCESS A LA ROUTE COURANTE)
  constructor(
    private pokemonService: PokemonService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // RECUPERER LE PARAMETRE PASSER A LA ROUTE
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if(pokemonId){
          this.pokemonService.getPokemonById(+pokemonId)
          .subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(
      () => this.goToPokemonList());
  }

  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }

  gotToEditPokemon(pokemon: Pokemon){
    this.router.navigate(['/edit/pokemon', pokemon.id])
  }

}
