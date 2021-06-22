import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserModule} from '../user/user.module';
import {PanierModule} from '../panier/panier.module';
import {RecommandationModule} from '../recommandation/recommandation.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProduitModule {
  constructor() {
  }
  idProduit : number;
  nomProduit : string;
  prix : number;
  quantite : number;
  photo: string;
  categorie: string;
  description: string;
  panier: PanierModule[] = [];
}
