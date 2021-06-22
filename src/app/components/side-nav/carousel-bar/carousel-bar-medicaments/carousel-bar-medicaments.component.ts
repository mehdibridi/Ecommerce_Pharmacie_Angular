import { Component, OnInit } from '@angular/core';
import {RecommandationModule} from '../../../../models/recommandation/recommandation.module';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {RecommandationService} from '../../../../services/recommandation.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-bar-medicaments',
  templateUrl: './carousel-bar-medicaments.component.html',
  styleUrls: ['./carousel-bar-medicaments.component.css']
})
export class CarouselBarMedicamentsComponent implements OnInit {

  recomendation: RecommandationModule[] = [];
  constructor(config: NgbCarouselConfig,
              public recommandationService: RecommandationService,
              private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.recommandationService.getTopCategorie('medicament').subscribe(
      (data: RecommandationModule[]) => {
        this.recomendation = data;
      }
    );
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
