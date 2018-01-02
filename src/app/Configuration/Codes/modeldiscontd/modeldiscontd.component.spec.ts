import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeldiscontdComponent } from './modeldiscontd.component';

describe('ModeldiscontdComponent', () => {
  let component: ModeldiscontdComponent;
  let fixture: ComponentFixture<ModeldiscontdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeldiscontdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeldiscontdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
