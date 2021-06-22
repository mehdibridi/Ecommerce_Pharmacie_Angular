import { Component, OnInit } from '@angular/core';
import {ProduitsService} from '../../../services/produits.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProduitModule} from '../../../models/produit/produit.module';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RecommandationService} from '../../../services/recommandation.service';
import {RecommandationModule} from '../../../models/recommandation/recommandation.module';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.css']
})
export class CreateProduitComponent implements OnInit {
  produitform: FormGroup;
  produit: ProduitModule;
  recommendation: RecommandationModule;
  selectedFile: any;
  imageName: string;
  formData: any;
  listCategorie = ['Beaute Soins', 'Bebe Maman', 'Materiel Medical', 'medicament'];
  constructor(public produitService: ProduitsService,
              public recommendationService: RecommandationService,
              private router: Router,
              private http: HttpClient) {}
init(){
  this.produitform = new FormGroup({
    nomProduit: new FormControl(''),
    prix: new FormControl(''),
    quantite: new FormControl(''),
    description: new FormControl(''),
    photo: new FormControl(''),
    categorie: new FormControl(this.listCategorie, Validators.required),

  });
}

  ngOnInit(): void {
    this.formData = new FormData();
    this.init();
  }

  handleImages(Event){
    this.selectedFile = Event.target.files[0];

    this.formData.append('file', this.selectedFile);
    console.log(this.selectedFile);
    this.imageName = Event.target.files[0].name;

  }

    onSubmit() {
    this.produit = new ProduitModule();
    this.produit.nomProduit = this.produitform.get('nomProduit').value;
    this.produit.prix = this.produitform.get('prix').value;
    this.produit.quantite = this.produitform.get('quantite').value;
    this.produit.categorie = this.produitform.get('categorie').value;
    this.produit.description = this.produitform.get('description').value;

    this.produit.photo = '../../../assets/image/' + this.imageName;

    this.produitService.addProduit(this.produit).subscribe(
      (data) => {
        this.produit = data;
        this.produitService.createNewFile(this.formData);
        this.recommendation = new RecommandationModule();
        this.recommendation.categorie = this.produit.categorie;
        this.recommendation.nomProduit = this.produit.nomProduit;
        this.recommendation.nbrSale = 0;
        this.recommendation.products = this.produit;
        this.recommendationService.addRecommandation(this.recommendation);
        this.router.navigate(['/liste_Produit']);
      }
    );
  }
}
