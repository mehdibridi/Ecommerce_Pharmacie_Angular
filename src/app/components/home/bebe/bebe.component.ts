import { Component, OnInit } from '@angular/core';
import {ProduitModule} from '../../../models/produit/produit.module';
import {Subscription} from 'rxjs';
import {ProduitsService} from '../../../services/produits.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-bebe',
  templateUrl: './bebe.component.html',
  styleUrls: ['./bebe.component.css']
})
export class BebeComponent implements OnInit {
  list: ProduitModule[]= [];
  subscription: Subscription;
  constructor(public produitService: ProduitsService,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.refresh();
  }
  refresh(){
    this.produitService.findCategorie('Bebe Maman').subscribe(
      (data: ProduitModule[]) => {
        this.list = data;
      }
    );
  }
  onFilter() {

    const searchKey = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    if (searchKey === '') {
      this.refresh();
    } else {
      this.list.forEach(
        e => {
          if (!JSON.stringify(e).toString().toLowerCase().includes(searchKey)) {
            const index = this.list.indexOf(e);
            this.list.splice(index, 1);
          }
        }
      );

    }
  }

  onProduct(produit: ProduitModule) {
    this.router.navigate(['/Product', produit.idProduit]);
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


}
