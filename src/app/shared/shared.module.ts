import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartsModule } from './charts/charts.module';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HeaderComponent, SidebarComponent } from './components';
import { MultiLinesChartSettingsComponent } from './components/modals';

import { ApiChartDataService } from './services/api-chart-data.service';
import { AxisConfigurationService } from './services/axis-configuration.service';
import { AxisConfigurationComponent } from './forms/axis-configuration/axis-configuration.component';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];
const LIB_MODULES = [NgbModule];
const COMPONENTS = [
  DefaultLayoutComponent,
  HeaderComponent,
  SidebarComponent,
  MultiLinesChartSettingsComponent,
  AxisConfigurationComponent,
];
const ENTRY_COMPONENTS = [
  MultiLinesChartSettingsComponent
]
const SHARED_PROVIDERS = [
  ApiChartDataService,
  AxisConfigurationService
];

@NgModule({
  declarations: [...COMPONENTS, ...ENTRY_COMPONENTS],
  imports: [
    ...BASE_MODULES,
    ...LIB_MODULES,

    ChartsModule.forRoot()
  ],
  exports: [
    ...BASE_MODULES,
    ...LIB_MODULES,
    ...COMPONENTS,
    ChartsModule
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...SHARED_PROVIDERS
      ]
    };
  }
}
