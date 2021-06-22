import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateProduitComponent} from './components/produit/create-produit/create-produit.component';
import {ListProduitComponent} from './components/produit/list-produit/list-produit.component';
import {UpdateProduitComponent} from './components/produit/update-produit/update-produit.component';
import {CreateUserComponent} from './components/user/create-user/create-user.component';
import {ListUserComponent} from './components/user/list-user/list-user.component';
import {UpdateUserComponent} from './components/user/update-user/update-user.component';
import {HomeComponent} from './components/home/home.component';
import {ProductComponent} from './components/product/product.component';

import {UserLoginComponent} from './components/user-login/user-login.component';
import {BeauteComponent} from './components/home/beaute/beaute.component';
import {BebeComponent} from './components/home/bebe/bebe.component';
import {MaterielComponent} from './components/home/materiel/materiel.component';
import {MedicamentsComponent} from './components/home/medicaments/medicaments.component';
import {ListPanierComponent} from './components/panier/list-panier/list-panier.component';
import {RecommandationComponent} from './components/recommandation/recommandation-list/recommandation.component';
import {UpdateRecommandationComponent} from './components/recommandation/update-recommandation/update-recommandation.component';
import {CommandesComponent} from './components/commandes/commandes.component';

const routes: Routes = [
  //{ path: 'new-command', component: NewCommandComponent},
    { path: 'Create_Produit', component: CreateProduitComponent},
    { path: 'liste_Produit', component: ListProduitComponent},
    { path: 'update_Produit/:id', component: UpdateProduitComponent},
    { path: 'Create_User', component: CreateUserComponent},
    { path: 'List_User', component: ListUserComponent},
    { path: 'update_User/:id', component: UpdateUserComponent},
    { path: 'home', component: HomeComponent},
    { path: 'Product/:id', component: ProductComponent},
    { path: 'Panier', component: ListPanierComponent},
    { path: 'Medicaments', component: MedicamentsComponent},
    { path: 'beaute', component: BeauteComponent},
    { path: 'bebe', component: BebeComponent},
    { path: 'materiel', component: MaterielComponent},
    { path: 'login', component: UserLoginComponent},
    { path: 'List_Recommandation', component: RecommandationComponent},
    { path: 'Update_Recommandation/:id', component: UpdateRecommandationComponent},
    { path: 'Commandes', component: CommandesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
