import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionnaliteComponent } from './fonctionnalite.component';

describe('FonctionnaliteComponent', () => {
  let component: FonctionnaliteComponent;
  let fixture: ComponentFixture<FonctionnaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionnaliteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionnaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
