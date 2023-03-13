import { POKEMONS } from './pokemon/mock-pokemon-list';
import { Injectable } from '@angular/core';
// AJOUTER UNE INTERFACE QUI VAS ME DEMANDER D'IMPLEMENTER UNE METHODE POUR SIMULER LA BASE DE DONNEES
import { InMemoryDbService } from 'angular-in-memory-web-api'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const pokemons = POKEMONS
      return { pokemons };
  }
}
