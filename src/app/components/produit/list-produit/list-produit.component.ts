import { Component, OnInit } from '@angular/core';
import {ProduitModule} from '../../../models/produit/produit.module';
import {Subscription} from 'rxjs';
import {ProduitsService} from '../../../services/produits.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements OnInit {

  list: ProduitModule[]= [];
  subscription: Subscription;
  constructor(public produitService: ProduitsService,
              private router: Router) { }

  ngOnInit(){
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
  onDelete(produit: ProduitModule) {
    if (confirm('Confirmez la suppression ?')) {
      this.produitService.deleteProduit(produit);
    }
  }
  onEdit(produit: ProduitModule) {
    this.router.navigate(['/update_Produit', produit.idProduit]);
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

  onClear() {
    (document.getElementById('searchInput') as HTMLInputElement).value = '';
    this.refresh();
  }

}
