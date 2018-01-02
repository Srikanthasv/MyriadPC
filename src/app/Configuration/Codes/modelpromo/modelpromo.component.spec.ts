import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelpromoComponent } from './modelpromo.component';

describe('ModelpromoComponent', () => {
  let component: ModelpromoComponent;
  let fixture: ComponentFixture<ModelpromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelpromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
