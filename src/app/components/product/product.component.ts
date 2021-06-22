import { Component, OnInit } from '@angular/core';
import {ProduitsService} from '../../services/produits.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProduitModule} from '../../models/produit/produit.module';
import {PanierModule} from '../../models/panier/panier.module';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {UserModule} from '../../models/user/user.module';
import {FormControl, FormGroup} from '@angular/forms';
import {PanierService} from '../../services/panier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  panierform: FormGroup;
  currentProduit: ProduitModule;
  user: UserModule;
  panier: PanierModule;
  username: null;
  panierProduit: PanierModule [] = [];
  constructor(private  produitService: ProduitsService,
              private  panierService: PanierService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
              private userService: UserService) { }

  ngOnInit(): void {
    this.panierform = new FormGroup({
      quantite: new FormControl('1')}
    );

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
        this.produitService.findId(+id).subscribe(
          (data) => {
              this.currentProduit = data;
          }
        );

      }
    );
    this.username = JSON.parse(localStorage.getItem('activeUser')).userName;
    this.userService.findUsername('admin').subscribe(
      (data: UserModule) => {
        this.user  = data;
      }
    );

  }

  onPanier() {

    this.panier = new PanierModule();
    this.panierService.getProduitPanier(this.currentProduit.idProduit).subscribe(
      (data: PanierModule[]) => {
        this.panierProduit = data;
       if (this.panierProduit.length !== 0){
          if (this.panierProduit[0].acheter === 'rien'){
          this.panier = this.panierProduit[0];
          this.panier.quantite = this.panier.quantite + Number(this.panierform.get('quantite').value);
          this.panierService.updatePanier(this.panier);


         }
         else if (this.panierProduit[0].acheter === 'acheter'){
           this.panier.quantite = this.panierform.get('quantite').value;
           this.panier.produits.push(this.currentProduit);
           this.panier.user.push(this.user);
           this.panier.acheter = 'rien';

           this.panierService.addPanier( this.panier );
         }
        }



        if (this.panierProduit.length ===  0){
          this.panier.quantite = this.panierform.get('quantite').value;
          this.panier.produits.push(this.currentProduit);
          this.panier.user.push(this.user);
          this.panier.acheter = 'rien';
           this.panierService.addPanier( this.panier );
        }
        this.router.navigate(['/Panier']).then(() => {
          window.location.reload();
        });

      }
    );

    /*
    this.panier.quantite = this.panierform.get('quantite').value;
    console.log(this.panier.quantite);
    this.panier.produits.push(this.currentProduit);
    this.panier.user.push(this.user);
    this.panier.acheter = 'rien';
    console.log(JSON.stringify(this.panier));
   this.panierService.addPanier( this.panier );
   this.panierService.updatePanier(this.panier);
   this.router.navigate(['/Panier']);*/
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
