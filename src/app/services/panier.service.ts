import { Injectable } from '@angular/core';
import {PanierModule} from '../models/panier/panier.module';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PanierService {
  paniers: PanierModule [] = [];
  panierSubject = new  Subject<PanierModule[]>();
  url = 'http://localhost:8080/panier';
  constructor(private http: HttpClient) { }



  emitPanierSubject() {
    this.panierSubject.next(this.paniers);
  }

  addPanier(panier: PanierModule) {
    this.paniers.push(panier);
    this.emitPanierSubject();
    return this.http.post<boolean>(this.url + '/add' , panier ).subscribe(
      (data) => {
        this.getPanier();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getPanier() {
    this.http.get<PanierModule[]>(this.url + '/getAll').subscribe(
      (data) => {
        this.paniers = data;
        this.emitPanierSubject();
      }, (error) => {
        console.log('Panier getAll error : ' + error);
      }
    );
  }
  findId(id: number){
    return this.http.get<PanierModule>(this.url + '/getById/' + id);
  }
  findById(id: number) {
    const panier = this.paniers.find(
      (p) => {
        return p.idPanier === id;
      }
    );
    return panier;
  }
  deletePanier(panier: PanierModule) {
    const index = this.paniers.indexOf(panier);
    this.paniers.splice(index, 1);
    this.emitPanierSubject();
    this.http.delete(this.url + '/delete/' + panier.idPanier)
      .subscribe(
        ()  => {
          this.getPanier();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }
  updatePanier(panier: PanierModule) {
    this.http
      .put<any>(this.url + '/update', panier)
      .subscribe(
        () => {
          this.getPanier();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getUsePanier(id:number){
    return this.http.get<PanierModule[]>(this.url + '/getByUser/' + id);
  }
  getProduitPanier(id:number){
    return this.http.get<PanierModule[]>(this.url + '/getByProduitId/' + id);
  }
  getPanierAcheter(id:number){
    return this.http.get<PanierModule[]>(this.url + '/getAcheter/' + id + '/acheter');
  }
  getPanierNonAcheter(id:number){
    return this.http.get<PanierModule[]>(this.url + '/getAcheter/' + id + '/rien');
  }
}
