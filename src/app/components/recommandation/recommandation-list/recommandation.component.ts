import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RecommandationService} from '../../../services/recommandation.service';
import {RecommandationModule} from '../../../models/recommandation/recommandation.module';
import {ProduitModule} from '../../../models/produit/produit.module';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recommandation',
  templateUrl: './recommandation.component.html',
  styleUrls: ['./recommandation.component.css']
})
export class RecommandationComponent implements OnInit {
  list: RecommandationModule[] = [];
  subscription: Subscription;
  constructor(public recommandationService: RecommandationService,
              private router: Router) { }

  ngOnInit(){
    this.refresh();

  }
  refresh() {
    this.subscription = this.recommandationService.recommandationSubject.subscribe(
      (data: RecommandationModule[]) => {
        this.list = data;
      }
    );
    this.recommandationService.getRecommandation();
  }
  onDelete(recommandation: RecommandationModule) {
    if (confirm('Confirmez la suppression ?')) {
      this.recommandationService.deleteRecommandation(recommandation);
    }
  }
  onEdit(recommandation: RecommandationModule) {
    this.router.navigate(['/Update_Recommandation', recommandation.idRecommandation]);
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
