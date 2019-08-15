import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLinesNavigatorChartComponent } from './multi-lines-navigator-chart.component';

describe('MultiLinesNavigatorChartComponent', () => {
  let component: MultiLinesNavigatorChartComponent;
  let fixture: ComponentFixture<MultiLinesNavigatorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLinesNavigatorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLinesNavigatorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
