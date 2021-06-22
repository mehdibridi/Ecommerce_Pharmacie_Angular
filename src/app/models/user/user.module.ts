import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanierModule} from '../panier/panier.module';
import {ProduitModule} from '../produit/produit.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  idUser: number;
  email: string;
  password: string;
  tel: string;
  userName: string;
  panier: PanierModule [] = [];

}
