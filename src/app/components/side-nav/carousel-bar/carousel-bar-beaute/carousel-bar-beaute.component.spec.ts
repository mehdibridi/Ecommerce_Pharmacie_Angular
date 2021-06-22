import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBarBeauteComponent } from './carousel-bar-beaute.component';

describe('CarouselBarBeauteComponent', () => {
  let component: CarouselBarBeauteComponent;
  let fixture: ComponentFixture<CarouselBarBeauteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselBarBeauteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselBarBeauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
