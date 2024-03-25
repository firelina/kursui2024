import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {PetriAgent} from "../../model/PetriAgent";
import {iterator} from "rxjs/internal/symbol/iterator";

@Component({
  selector: 'app-petri-view',
  templateUrl: './petri-view.component.html',
  styleUrls: ['./petri-view.component.css']
})
export class PetriViewComponent {
  title: string = ' ';
  state: number = 0;
  step = 0;
  agent: PetriAgent = new PetriAgent();
  counter: number = 0;
  @Input("agent")
  set setAgent(agent: PetriAgent){
    this.agent = agent;
    this.title = this.agent.title;
    this.step = 0;
  }
  agents: PetriAgent[];
  @Input("agents")
  set setAgents(agents: PetriAgent[]){
    this.agents = agents;
    this.step = 0;
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  onByStep(): void{
    if (this.agent.states){
      if(this.step >= this.agent.states.length)
        this.step = 0;
      this.state = this.agent.states[this.step];
      this.cdr.detectChanges();
      this.step += 1;
    }
  }
  onByStepWithParam(agent: PetriAgent): void{
    let step = 0;
    if (agent.states){
      agent.states.forEach((state, index) => {
        setTimeout(() => {
          this.state = state;
          console.log(this.state);
          this.cdr.detectChanges();
          }, 1000 * index);;
      });
    }
  }
  onAuto(): void{
    this.agents.forEach((item, index) =>  {
      setTimeout(() => {
        this.title = item.title;
        this.onByStepWithParam(item);
      }, index * 7000);

    });
  }
}
