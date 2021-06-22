import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecommandationComponent } from './update-recommandation.component';

describe('UpdateRecommandationComponent', () => {
  let component: UpdateRecommandationComponent;
  let fixture: ComponentFixture<UpdateRecommandationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRecommandationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecommandationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
