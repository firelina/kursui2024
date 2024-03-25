import {Component, OnInit} from '@angular/core';
import {ModelService} from "../../service/model.service";
import {StatModel} from "../../model/StatModel";
import {StartModel} from "../../model/StartModel";
import {AgentModel} from "../../model/AgentModel";
import {ConsumerModel} from "../../model/ConsumerModel";
import {PetriAgent} from "../../model/PetriAgent";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  cookieName = 'guid';
  guid: string = '';
  myTimeout = 500;
  stats: StatModel = new StatModel();
  prevStats: StatModel = new StatModel();
  notRefreshCounter: number = 5;
  timerId: any;
  startModel: StartModel;
  active = 1;
  agents: PetriAgent[] = [];
  selectedPetriAgent: PetriAgent = new PetriAgent();
  constructor(private modelService: ModelService) {
  }

  ngOnInit(): void {
    this.initStartModel(new StartModel());
    if(this.getCookieValue(this.cookieName))
      this.timerId = setInterval(() => this.onRefresh(), this.myTimeout);
  }
  initStartModel(startModel: StartModel): void{
    this.startModel = startModel;
    this.startModel.agent = new AgentModel();
    const bankomap = new ConsumerModel();
    bankomap.state = 1;
    bankomap.count = 2;
    bankomap.prefTitle = "Банкомат";
    bankomap.timeLimit = 15;
    bankomap.firstDelay = 3;
    bankomap.secondDelay = 0;
    bankomap.thirdDelay = 5;
    const clerk = new ConsumerModel();
    clerk.state = 2;
    clerk.count = 4;
    clerk.prefTitle = "Клерк";
    clerk.timeLimit = 30;
    clerk.firstDelay = 5;
    clerk.secondDelay = 0;
    clerk.thirdDelay = 15;
    this.startModel.consumers = Array.of(bankomap, clerk);
  }
  onTest(startModel: StartModel): void{
    console.log(this.startModel);
    this.modelService.testStart().subscribe(result => {
      this.guid = result['guid'];
      this.timerId = setInterval(() => this.onRefresh(), this.myTimeout);
    }, error => {
      console.log(error);
    });
  }
  onStart(event: string): void{
    console.log(this.startModel);
    this.modelService.start(this.startModel).subscribe(result => {
      this.guid = result['guid'];
      document.cookie = `${this.cookieName}=${this.guid}`;
      this.timerId = setInterval(() => this.onRefresh(), 1000);
    }, error => {
      console.log(error);
    });
  }

  onStop(event: string): void{
    this.modelService.stop(this.guid).subscribe(result => {
      console.log(result);
      document.cookie = "guid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      clearInterval(this.timerId);
    }, error => {
      console.log(error);
    });
  }
  onRefresh(event?: string): void{
    this.modelService.stat().subscribe(result => {
      this.prevStats = this.stats;
      this.stats = result;
    }, error => {
      console.log(error);
    });
  }
  onSetAgent(agent: AgentModel){
    this.startModel.agent = agent;
  }
  onSetBankomat(bankomat: ConsumerModel): void{
    this.startModel.consumers[0] = bankomat;
  }
  onSetClerk(clerk: ConsumerModel): void{
    this.startModel.consumers[1] = clerk;
  }
  getCookieValue(cookieName): string {
  const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === cookieName) {
        return cookie[1];
      }
    }
    return "";
  }
  onModel(): void{
    this.active = 1;
  }
  onPetri(): void{
    this.active = 2;
    this.modelService.petri().subscribe(result => {
      this.agents = result;
    })
  }

  onSelectPetri(petri: PetriAgent): void{
    this.selectedPetriAgent = petri;
  }

}
