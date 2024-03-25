import {Component, Input, OnInit} from '@angular/core';
import {AgentModel} from "../../model/AgentModel";

@Component({
  selector: 'app-agent-view',
  templateUrl: './agent-view.component.html',
  styleUrls: ['./agent-view.component.css']
})
export class AgentViewComponent implements OnInit{
  agent: AgentModel;
  @Input("agent")
  set setAgent(agent: AgentModel){
    this.agent = agent;
  }

  ngOnInit(): void {
  }
}
