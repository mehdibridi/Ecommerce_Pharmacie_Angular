import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {RecommandationService} from '../../../services/recommandation.service';
import {RecommandationModule} from '../../../models/recommandation/recommandation.module';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-bar',
  templateUrl: './carousel-bar.component.html',
  styleUrls: ['./carousel-bar.component.css']
})
export class CarouselBarComponent implements OnInit {

  recomendation: RecommandationModule[] = [];
  constructor(config: NgbCarouselConfig,
              public recommandationService: RecommandationService,
              private sanitizer: DomSanitizer) {
   /* config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;*/
  }
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  ngOnInit(): void {
    this.recommandationService.getTopRecommandation().subscribe(
      (data: RecommandationModule[]) => {
        this.recomendation = data;
      }
    );
  }
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
