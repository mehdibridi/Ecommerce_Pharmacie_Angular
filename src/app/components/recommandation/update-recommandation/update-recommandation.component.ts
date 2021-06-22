import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RecommandationService} from '../../../services/recommandation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProduitModule} from '../../../models/produit/produit.module';
import {RecommandationComponent} from '../recommandation-list/recommandation.component';
import {RecommandationModule} from '../../../models/recommandation/recommandation.module';

@Component({
  selector: 'app-update-recommandation',
  templateUrl: './update-recommandation.component.html',
  styleUrls: ['./update-recommandation.component.css']
})
export class UpdateRecommandationComponent implements OnInit {

  form: FormGroup;
  currentRecommandation: RecommandationModule;
  constructor(public  recommandationService: RecommandationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
        this.currentRecommandation = this.recommandationService.findById(+id);
        this.init();
      }
    );
  }
  init() {
    this.form = new FormGroup({
      nomProduit: new FormControl(this.currentRecommandation.nomProduit, Validators.required),
      categorie: new FormControl(this.currentRecommandation.categorie, Validators.required),
      nbrSale: new FormControl(this.currentRecommandation.nbrSale, Validators.required),
    });
  }
  get nomProduit() { return this.form.get('nomProduit'); }

  get categorie() { return this.form.get('categorie'); }

  get nbrSale() { return this.form.get('nbrSale'); }

  onSubmit() {
    if (confirm('Confirmer la modification ? ')) {
      this.currentRecommandation.nomProduit = this.form.get('nomProduit').value;
      this.currentRecommandation.categorie = this.form.get('categorie').value;
      this.currentRecommandation.nbrSale = this.form.get('nbrSale').value;
      this.recommandationService.updateRecommandation(this.currentRecommandation);

      this.router.navigate(['/List_Recommandation']);
    }

  }
}
