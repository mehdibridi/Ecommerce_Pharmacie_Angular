import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserModule} from '../../models/user/user.module';
import {ProduitModule} from '../../models/produit/produit.module';
import {PanierModule} from '../../models/panier/panier.module';
import {PanierService} from '../../services/panier.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RecommandationService} from '../../services/recommandation.service';
import {RecommandationModule} from '../../models/recommandation/recommandation.module';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  panierform: FormGroup;
  userId: null;
  user: UserModule;
  produits: ProduitModule[] = [];
  panier: PanierModule[] = [];
  somme = 0;
  recommandation: RecommandationModule[] = [];
  constructor(private panierService: PanierService,
              private recommendationService: RecommandationService,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {

   this.userId = JSON.parse(localStorage.getItem('activeUser')).idUser;
    this.panierService.getPanierAcheter(this.userId).subscribe(
      (data: PanierModule[]) => {
        this.panier = data;
        for (let index of this.panier){
          this.somme += index.produits[0].prix * index.quantite;
        }
      }
    );

  }
  onDelete(panier: PanierModule) {
    if (confirm('Confirmez la suppression ?')) {
      this.panierService.deletePanier(panier);
      this.router.navigate(['/Commandes']).then(() => {
        window.location.reload();
      });
    }
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
