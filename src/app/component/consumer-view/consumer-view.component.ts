import {Component, Input} from '@angular/core';
import {AgentModel} from "../../model/AgentModel";
import {ConsumerModel} from "../../model/ConsumerModel";

@Component({
  selector: 'app-consumer-view',
  templateUrl: './consumer-view.component.html',
  styleUrls: ['./consumer-view.component.css']
})
export class ConsumerViewComponent {
  consumer: ConsumerModel;
  @Input("consumer")
  set setConsumer(consumer: ConsumerModel){
    this.consumer = consumer;
  }
}
