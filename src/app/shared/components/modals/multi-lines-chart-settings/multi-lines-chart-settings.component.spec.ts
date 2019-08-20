import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLinesChartSettingsComponent } from './multi-lines-chart-settings.component';

describe('MultiLinesChartSettingsComponent', () => {
  let component: MultiLinesChartSettingsComponent;
  let fixture: ComponentFixture<MultiLinesChartSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLinesChartSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLinesChartSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
