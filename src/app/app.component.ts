import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { HeaderComponent } from './component/header/header.component';
import { navbarData } from './component/sidenav/nav-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    SidenavComponent,
    HeaderComponent,
    
  ],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    '../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css',
  ],
})
export class AppComponent {
  navbarData = navbarData;
  isCollapsed = false;
}
