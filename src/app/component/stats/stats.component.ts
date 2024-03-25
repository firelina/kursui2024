import {Component, Input, OnInit} from '@angular/core';
import {StatModel} from "../../model/StatModel";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{

  stats: StatModel = new StatModel();
  @Input("stats")
  set setStats(stats: StatModel){
    if(stats) {
      this.stats = stats;
    }
  }

  ngOnInit(): void {
  }

}
