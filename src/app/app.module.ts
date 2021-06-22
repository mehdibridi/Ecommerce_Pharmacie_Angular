import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListPanierComponent } from './components/panier/list-panier/list-panier.component';
import { UpdateProduitComponent } from './components/produit/update-produit/update-produit.component';
import { ListProduitComponent } from './components/produit/list-produit/list-produit.component';
import { CreateProduitComponent } from './components/produit/create-produit/create-produit.component';
import { CreateRoleComponent } from './components/role/create-role/create-role.component';
import { ListRoleComponent } from './components/role/list-role/list-role.component';
import { UpdateRoleComponent } from './components/role/update-role/update-role.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PanierService} from './services/panier.service';
import {ProduitsService} from './services/produits.service';
import {RoleService} from './services/role.service';
import {UserService} from './services/user.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import {UserLoginComponent} from './components/user-login/user-login.component';
import { BeauteComponent } from './components/home/beaute/beaute.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BebeComponent } from './components/home/bebe/bebe.component';
import { MaterielComponent } from './components/home/materiel/materiel.component';
import { MedicamentsComponent } from './components/home/medicaments/medicaments.component';
import { RecommandationComponent } from './components/recommandation/recommandation-list/recommandation.component';
import { UpdateRecommandationComponent } from './components/recommandation/update-recommandation/update-recommandation.component';
import { CommandesComponent } from './components/commandes/commandes.component';
import { NavBarComponent } from './components/side-nav/nav-bar/nav-bar.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { CarouselBarComponent } from './components/side-nav/carousel-bar/carousel-bar.component';
import { FooterBarComponent } from './components/side-nav/footer-bar/footer-bar.component';
import { CarouselBarBeauteComponent } from './components/side-nav/carousel-bar/carousel-bar-beaute/carousel-bar-beaute.component';
import { CarouselBarBebeComponent } from './components/side-nav/carousel-bar/carousel-bar-bebe/carousel-bar-bebe.component';
import { CarouselBarMaterielComponent } from './components/side-nav/carousel-bar/carousel-bar-materiel/carousel-bar-materiel.component';
import { CarouselBarMedicamentsComponent } from './components/side-nav/carousel-bar/carousel-bar-medicaments/carousel-bar-medicaments.component';


@NgModule({
  declarations: [
    AppComponent,
    ListPanierComponent,
    UpdateProduitComponent,
    ListProduitComponent,
    CreateProduitComponent,
    CreateRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
    UpdateUserComponent,
    ListUserComponent,
    CreateUserComponent,
    HomeComponent,
    ProductComponent,
    UserLoginComponent,
    BeauteComponent,
    BebeComponent,
    MaterielComponent,
    MedicamentsComponent,
    RecommandationComponent,
    UpdateRecommandationComponent,
    CommandesComponent,
    NavBarComponent,
    CarouselBarComponent,
    FooterBarComponent,
    CarouselBarBeauteComponent,
    CarouselBarBebeComponent,
    CarouselBarMaterielComponent,
    CarouselBarMedicamentsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    PanierService,
    ProduitsService,
    RoleService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
