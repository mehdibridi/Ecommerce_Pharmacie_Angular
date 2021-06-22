import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProduitModule} from '../produit/produit.module';
import {UserModule} from '../user/user.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PanierModule {
  idPanier: number;
  quantite: number;
  produits: ProduitModule[] = [];
  user: UserModule[] = [];
  acheter: string;
}
