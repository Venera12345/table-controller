import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTableComponent} from "./list-table/list-table.component";
import {TableComponent} from "./table/table.component";

const routes: Routes = [
  {
    path: '',
    component: ListTableComponent
  },
  {
    path: ':id',
    component: TableComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
