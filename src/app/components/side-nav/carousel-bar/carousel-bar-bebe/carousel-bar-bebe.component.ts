import { Component, OnInit } from '@angular/core';
import {RecommandationModule} from '../../../../models/recommandation/recommandation.module';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {RecommandationService} from '../../../../services/recommandation.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-bar-bebe',
  templateUrl: './carousel-bar-bebe.component.html',
  styleUrls: ['./carousel-bar-bebe.component.css']
})
export class CarouselBarBebeComponent implements OnInit {

  recomendation: RecommandationModule[] = [];
  constructor(config: NgbCarouselConfig,
              public recommandationService: RecommandationService,
              private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.recommandationService.getTopCategorie('Bebe Maman').subscribe(
      (data: RecommandationModule[]) => {
        this.recomendation = data;
        console.log(this.recomendation);
      }
    );
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
