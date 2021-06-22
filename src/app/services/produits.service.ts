import {Injectable, OnInit} from '@angular/core';
import {ProduitModule} from '../models/produit/produit.module';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  produits: ProduitModule[] = [];
  produitSubject = new Subject<ProduitModule[]>();
  url = 'http://localhost:8080/produit';

  constructor(private http: HttpClient) {
  }

  emitProduitSubject() {
    this.produitSubject.next(this.produits);
  }

  addProduit(produit: ProduitModule): Observable<ProduitModule>{
    this.produits.push(produit);
    this.emitProduitSubject();
    return this.http.post<ProduitModule>(this.url + '/add' , produit );
  }

  getProduit() {
    this.http.get<ProduitModule[]>(this.url + '/getAll').subscribe(
      (data) => {
        this.produits = data;
        this.emitProduitSubject();
      }, (error) => {
        console.log('Produit getAll error : ' + error);
      }
    );
  }
  findId(id: number){
    return this.http.get<ProduitModule>(this.url + '/getById/' + id);
  }
  findById(id: number) {
    const produit = this.produits.find(
      (p) => {
        return p.idProduit === id;
      }
    );
    return produit;
  }
  deleteProduit(produit: ProduitModule) {
    const index = this.produits.indexOf(produit);
    this.produits.splice(index, 1);
    this.emitProduitSubject();
    this.http.delete(this.url + '/delete/' + produit.idProduit)
      .subscribe(
        ()  => {
          this.getProduit();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }
  updateProduit(produit: ProduitModule) {
    this.http
      .put<any>(this.url + '/update', produit)
      .subscribe(
        () => {
          this.getProduit();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  createNewFile(file: any) {
    this.http
      .post<any>( this.url + '/upload', file)
      .subscribe(
        () => {
          console.log(' file sent !');
        },
        (error) => {
          console.log('Erreur while sending file : ' + error);
        }
      );
  }

  findCategorie(categorie: string){
    return this.http.get<ProduitModule[]>(this.url + '/getByCategorie/' + categorie);
  }

}
