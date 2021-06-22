import { Component, OnInit } from '@angular/core';
import {ProduitsService} from '../../services/produits.service';
import {Router} from '@angular/router';
import {ProduitModule} from '../../models/produit/produit.module';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: ProduitModule[]= [];
  subscription: Subscription;
  page = 2;

  constructor(public produitService: ProduitsService,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.refresh();

  }
  refresh() {
    this.subscription = this.produitService.produitSubject.subscribe(
      (data: ProduitModule[]) => {
        this.list = data;
      }
    );
    this.produitService.getProduit();
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
  onClear() {
    (document.getElementById('searchInput') as HTMLInputElement).value = '';
    this.refresh();
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
