import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';

import { NbLayoutModule,
         NbLayoutComponent,
         NbSidebarModule,
         NbSidebarComponent,
         NbMenuModule,
         NbMenuComponent,
         NbSidebarService,
         NbMenuService
 } from '@nebular/theme';

 import { MENU_ITEMS } from 'src/app/modules/pages/pages-menu';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, NbLayoutModule, NbSidebarModule, NbMenuModule, RouterModule],
  providers: [NbLayoutComponent, NbMenuComponent, NbSidebarComponent,NbSidebarService, NbMenuComponent,NbMenuService],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  menu = MENU_ITEMS;
}
