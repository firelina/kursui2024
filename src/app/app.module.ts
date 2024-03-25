import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MyRoutingModule} from "./my-routing/my-routing.module";
import {MODEL_URL} from "./util/constant";
import { MainComponent } from './component/main/main.component';
import { StatsComponent } from './component/stats/stats.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LeftSideComponent } from './component/left-side/left-side.component';
import { ConsumerDialogComponent } from './component/consumer-dialog/consumer-dialog.component';
import { AgentDialogComponent } from './component/agent-dialog/agent-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgentViewComponent } from './component/agent-view/agent-view.component';
import { ConsumerViewComponent } from './component/consumer-view/consumer-view.component';
import { PetriTableComponent } from './component/petri-table/petri-table.component';
import { PetriViewComponent } from './component/petri-view/petri-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StatsComponent,
    HeaderComponent,
    FooterComponent,
    LeftSideComponent,
    ConsumerDialogComponent,
    AgentDialogComponent,
    AgentViewComponent,
    ConsumerViewComponent,
    PetriTableComponent,
    PetriViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MyRoutingModule,
    NgbModule
  ],
  providers: [
    {provide: MODEL_URL, useValue: environment.backendURL + '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
