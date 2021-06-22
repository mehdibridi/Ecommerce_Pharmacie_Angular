import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RecommandationModule} from '../models/recommandation/recommandation.module';
import {PanierModule} from '../models/panier/panier.module';

@Injectable({
  providedIn: 'root'
})
export class RecommandationService {

  recommandations: RecommandationModule [] = [];
  recommandationSubject = new  Subject<RecommandationModule[]>();
  url = 'http://localhost:8080/recommandation';
  constructor(private http: HttpClient) { }
  emitRecommandationSubject() {
    this.recommandationSubject.next(this.recommandations);
  }

  addRecommandation(recommandation: RecommandationModule) {
    this.recommandations.push(recommandation);
    this.emitRecommandationSubject();
    return this.http.post<boolean>(this.url + '/add' , recommandation ).subscribe(
      (data) => {
        this.getRecommandation();
        console.log('create');
      }, (error) => {
        console.log('Erreur : ' + error);
      }
    );
  }

  getRecommandation() {
    this.http.get<RecommandationModule[]>(this.url + '/getAll').subscribe(
      (data) => {
        this.recommandations = data;
        this.emitRecommandationSubject();
      }, (error) => {
        console.log('Recommandation getAll error : ' + error);
      }
    );
  }
  findId(id: number){
    return this.http.get<RecommandationModule>(this.url + '/getById/' + id);
  }
  findById(id: number) {
    const recommandation = this.recommandations.find(
      (p) => {
        return p.idRecommandation === id;
      }
    );
    return recommandation;
  }
  deleteRecommandation(recommandation: RecommandationModule) {
    const index = this.recommandations.indexOf(recommandation);
    this.recommandations.splice(index, 1);
    this.emitRecommandationSubject();
    this.http.delete(this.url + '/delete/' + recommandation.idRecommandation)
      .subscribe(
        ()  => {
          this.getRecommandation();
          console.log('Delete ');
        },
        error  => {
          console.log('Error ', error);
        }
      );
  }
  updateRecommandation(recommandation: RecommandationModule) {
    this.http
      .put<any>(this.url + '/update', recommandation)
      .subscribe(
        () => {
          this.getRecommandation();
          console.log('Update !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getByNom(nom: string){
    return this.http.get<RecommandationModule>(this.url + '/getByNom/' + nom);
  }
  getTopRecommandation(){
    return this.http.get<RecommandationModule[]>(this.url + '/getTopRecommandation');
  }
  getTopCategorie(categorie: string){
    return this.http.get<RecommandationModule[]>(this.url + '/getByCategorie/' + categorie);
  }
}
