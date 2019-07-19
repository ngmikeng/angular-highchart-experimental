import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLinesChartComponent } from './multi-lines-chart.component';

describe('MultiLinesChartComponent', () => {
  let component: MultiLinesChartComponent;
  let fixture: ComponentFixture<MultiLinesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLinesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLinesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
