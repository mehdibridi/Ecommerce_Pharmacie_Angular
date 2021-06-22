import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselBarBebeComponent } from './carousel-bar-bebe.component';

describe('CarouselBarBebeComponent', () => {
  let component: CarouselBarBebeComponent;
  let fixture: ComponentFixture<CarouselBarBebeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselBarBebeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselBarBebeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
