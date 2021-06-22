import { Component, OnInit } from '@angular/core';
import {RecommandationModule} from '../../../../models/recommandation/recommandation.module';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {RecommandationService} from '../../../../services/recommandation.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-bar-beaute',
  templateUrl: './carousel-bar-beaute.component.html',
  styleUrls: ['./carousel-bar-beaute.component.css']
})
export class CarouselBarBeauteComponent implements OnInit {
  recomendation: RecommandationModule[] = [];
  constructor(config: NgbCarouselConfig,
              public recommandationService: RecommandationService,
              private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.recommandationService.getTopCategorie('Beaute Soins').subscribe(
      (data: RecommandationModule[]) => {
        this.recomendation = data;
      }
    );
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
