import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
         NbLayoutModule, 
         NbLayoutComponent,
         NbActionsModule,
         NbActionComponent,
         NbActionsComponent,
         NbUserModule,
         NbUserComponent,
         NbContextMenuModule,
         NbIconModule,
         NbSidebarService,
         NbMenuService, } from '@nebular/theme';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NbLayoutModule, NbActionsModule, NbUserModule, NbContextMenuModule, NbIconModule],
  providers: [NbLayoutComponent, NbActionComponent, NbUserComponent, NbActionsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  userPictureOnly: boolean = false;
  user: string = "";
  userMenu = [{title:"Cerrar Sesión"}]

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService
  ){}

  ngOnInit(): void {
    this.user = (localStorage.getItem('nombrePersona'))??'Sebastian Villarreal';
    this.menuService.onItemClick()
    .pipe(
      filter(({tag}) => tag === 'acciones'),
      map(({item: {title}}) => title)
    )
    .subscribe((title) => {
      if(title === "Cerrar Sesión")
      {
        this.logOut();
      }
    })
  }

  toggleSidebar(): boolean{
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  logOut(): void{
    localStorage.clear(),
    this.router.navigate(['/auth/login'])
  }
}
