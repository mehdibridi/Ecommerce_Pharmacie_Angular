import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBarMaterielComponent } from './carousel-bar-materiel.component';

describe('CarouselBarMaterielComponent', () => {
  let component: CarouselBarMaterielComponent;
  let fixture: ComponentFixture<CarouselBarMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselBarMaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselBarMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
