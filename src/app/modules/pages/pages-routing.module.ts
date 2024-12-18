import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { PolizaComponent } from './polizas/polizas.component';
import { ListaPolizasComponent } from './lista-polizas/lista-polizas.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'polizas',
      component: PolizaComponent
    },
    {
      path: 'lista-polizas',
      component: ListaPolizasComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}