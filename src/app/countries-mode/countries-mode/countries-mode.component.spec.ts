import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesModeComponent } from './countries-mode.component';

describe('CountriesModeComponent', () => {
  let component: CountriesModeComponent;
  let fixture: ComponentFixture<CountriesModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
