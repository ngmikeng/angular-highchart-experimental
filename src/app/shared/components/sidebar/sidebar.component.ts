import { Component, OnInit } from '@angular/core';
import { ROOT_PATH } from '../../../core/core.const';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuLinks = [
    { path: `/${ROOT_PATH}/chart-multi-lines`, label: 'Multi-lines' },
    { path: `/${ROOT_PATH}/chart-multi-lines-navigator`, label: 'Multi-lines navigator' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
