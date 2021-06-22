import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBarMedicamentsComponent } from './carousel-bar-medicaments.component';

describe('CarouselBarMedicamentsComponent', () => {
  let component: CarouselBarMedicamentsComponent;
  let fixture: ComponentFixture<CarouselBarMedicamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselBarMedicamentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselBarMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
