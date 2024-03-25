import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "../component/main/main.component";

const routes: Routes = [
  {path: '',
    component: MainComponent,
  },
  {path: 'index', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: '/'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MyRoutingModule { }
