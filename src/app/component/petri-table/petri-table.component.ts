import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PetriAgent} from "../../model/PetriAgent";

@Component({
  selector: 'app-petri-table',
  templateUrl: './petri-table.component.html',
  styleUrls: ['./petri-table.component.css']
})
export class PetriTableComponent {
  page = 1;
  pageSize = 15;
  collectionSize = 100;
  agents: PetriAgent[];
  agentsSlice:  PetriAgent[];
  selectedAgent: PetriAgent;

  @Input("petris")
  set setAgent(agents: PetriAgent[]){
    this.agents = agents;
    this.refreshCountries();
    this.collectionSize = this.agents.length;
  }
  @Output()
  selectAgent = new EventEmitter<PetriAgent>();

  constructor() {
    this.refreshCountries();
  }



  refreshCountries() {
    console.log(this.agents)
    if (this.agents){
      this.agentsSlice = this.agents.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
    }
  }
  onSelect(agent: PetriAgent): void{
    if(!agent)
      return;
    this.selectedAgent = agent;
    this.selectAgent.emit(agent)
  }
}
