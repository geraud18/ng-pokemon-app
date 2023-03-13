// ng g module pokemon CREATION D'UN MODULE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { BorderCardDirective } from './border-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from '../auth.guard';

// AuthGuard EST LE GUARD DE L'AUTHENTIFICATION GERRER PAR CANACTIVATE (cad QU'AVANT QUE L'UTILISATEUR ACCEDE A LA ROUTE ON VERIFIER SI LA GUARD RETOURNE TRUE OU FALSE SUR CANACTIVATE)
const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/add', component: AddPokemonComponent, canActivate: [AuthGuard]  },
  { path: 'pokemons', component: ListPokemonComponent, canActivate: [AuthGuard]  },
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [AuthGuard]  },
 ];

// COMMONMODULE QUI COMPORTE LES DIRECTIVE STRUTURELLE
@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent
  ],
  // IMPORTER MES ROUTES
  // FORMSMODULE BIBLIOTHEQUE QUI PERMET DE GERER LES FORMULAIRES
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [
    PokemonService 
  ]
})
export class PokemonModule { }
