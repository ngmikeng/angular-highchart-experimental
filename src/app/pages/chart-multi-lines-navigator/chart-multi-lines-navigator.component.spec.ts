import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMultiLinesNavigatorComponent } from './chart-multi-lines-navigator.component';

describe('ChartMultiLinesNavigatorComponent', () => {
  let component: ChartMultiLinesNavigatorComponent;
  let fixture: ComponentFixture<ChartMultiLinesNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMultiLinesNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMultiLinesNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
