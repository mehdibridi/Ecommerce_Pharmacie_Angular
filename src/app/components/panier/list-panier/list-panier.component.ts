import { Component, OnInit } from '@angular/core';
import {PanierService} from '../../../services/panier.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserModule} from '../../../models/user/user.module';
import {UserService} from '../../../services/user.service';
import {PanierModule} from '../../../models/panier/panier.module';
import {ActivatedRoute, Router} from '@angular/router';
import {ProduitModule} from '../../../models/produit/produit.module';
import {FormControl, FormGroup} from '@angular/forms';
import {RecommandationModule} from '../../../models/recommandation/recommandation.module';
import {RecommandationService} from '../../../services/recommandation.service';

@Component({
  selector: 'app-list-panier',
  templateUrl: './list-panier.component.html',
  styleUrls: ['./list-panier.component.css']
})
export class ListPanierComponent implements OnInit {
  panierform: FormGroup;
  userId: null;
  user: UserModule;
  produits: ProduitModule[] = [];
  panier: PanierModule[] = [];
  somme = 0;
  recommandation: RecommandationModule;

  constructor(private panierService: PanierService,
              private recommendationService: RecommandationService,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {

   this.userId = JSON.parse(localStorage.getItem('activeUser')).idUser;
   this.panierService.getPanierNonAcheter(this.userId).subscribe(
      (data: PanierModule[]) => {
        this.panier = data;
        for (let index of this.panier){
          this.somme += index.produits[0].prix * index.quantite;
        }
        console.log(this.panier);
      }
    );
   this.panierform = new FormGroup({
      quantite: new FormControl('')}
    );
    /*this.userService.findUsername(this.username).subscribe(
      (data: UserModule) => {
        this.user  = data;
      }
    );*/

 //  console.log(this.panier);
  }
 /*/ calculSomme(){
    let somme =  0;
    for (let index of this.panier){
     somme += index.produits[0].prix * index.quantite;
      console.log(index);
    }
    return somme;
  }*/
  purchase(){
    for (let index of this.panier){
     index.acheter = 'acheter';
      this.panierService.updatePanier(index);
      this.recommendationService.getByNom(index.produits[0].nomProduit).subscribe(
        (data: RecommandationModule) => {
          this.recommandation = data;
            this.recommandation.nbrSale = this.recommandation.nbrSale + index.quantite;
            console.log( this.recommandation);
            this.recommendationService.updateRecommandation(this.recommandation);
            this.router.navigate(['/Commandes']);

        }
      );
    }
   this.router.navigate(['/Commandes']);
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onDelete(panier: PanierModule) {
    if (confirm('Confirmez la suppression ?')) {
      this.panierService.deletePanier(panier);
      this.router.navigate(['/Panier']).then(() => {
        window.location.reload();
      });
    }
  }
}
