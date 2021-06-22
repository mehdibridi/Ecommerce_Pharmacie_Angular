import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduitModule} from '../produit/produit.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RecommandationModule {
  constructor() {
  }
  idRecommandation: number;
  nbrSale: number;
  nomProduit: string;
  categorie: string;
  products: ProduitModule;
}
