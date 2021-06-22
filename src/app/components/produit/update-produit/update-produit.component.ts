import { Component, OnInit } from '@angular/core';
import {ProduitsService} from '../../../services/produits.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProduitModule} from '../../../models/produit/produit.module';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {

  form: FormGroup;
  currentProduit : ProduitModule;
  listCategorie = ['Beaute Soins', 'Bebe Maman', 'Materiel Medical', 'medicament'];

  constructor(public  produitsService: ProduitsService,
              private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
        this.currentProduit = this.produitsService.findById(+id);
        this.init();
      }
    );
  }
  init() {
    this.form = new FormGroup({
      nomProduit: new FormControl(this.currentProduit.nomProduit, Validators.required),
      photo: new FormControl(this.currentProduit.photo, Validators.required),
      prix: new FormControl(this.currentProduit.prix, Validators.required),
      quantite: new FormControl(this.currentProduit.quantite, Validators.required),
      description: new FormControl(this.currentProduit.description, Validators.required),
      categorie: new FormControl(this.listCategorie, Validators.required),

    });
  }
  get nomProduit() { return this.form.get('nomProduit'); }

  get photo() { return this.form.get('photo'); }

  get prix() { return this.form.get('prix'); }
  get quantite() { return this.form.get('quantite'); }
  get description() { return this.form.get('description'); }
  get categorie() { return this.form.get('categorie'); }

  onSubmit() {
    if (confirm('Confirmer la modification ? ')) {
      this.currentProduit.nomProduit = this.form.get('nomProduit').value;
      this.currentProduit.photo = this.form.get('photo').value;
      this.currentProduit.prix = this.form.get('prix').value;
      this.currentProduit.quantite = this.form.get('quantite').value;
      this.currentProduit.description = this.form.get('description').value;
      this.currentProduit.categorie = this.form.get('categorie').value;
        this.produitsService.updateProduit(this.currentProduit);
      this.router.navigate(['/liste_Produit']);
    }

  }
}
