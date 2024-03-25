import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ModelService} from "../../service/model.service";
import {StatModel} from "../../model/StatModel";
import {AgentModel} from "../../model/AgentModel";
import {NgbModal, NgbOffcanvas, OffcanvasDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {AgentDialogComponent} from "../agent-dialog/agent-dialog.component";
import {ConsumerDialogComponent} from "../consumer-dialog/consumer-dialog.component";
import {ConsumerModel} from "../../model/ConsumerModel";
import {StartModel} from "../../model/StartModel";

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit{
  isDisableStop: boolean = false;
  isDisableStart: boolean = false;
  startModel: StartModel;
  @Input("startModel")
  set setStartModel(startModel: StartModel){
    this.startModel = startModel;
    this.agent = this.startModel.agent;
    this.bankomat = this.startModel.consumers[0];
    this.clerk = this.startModel.consumers[1];
  }
  agent: AgentModel;
  bankomat: ConsumerModel;
  clerk: ConsumerModel;
  closeResult = '';
  @Output()
  starting = new EventEmitter<string>();
  @Output()
  stoping = new EventEmitter<string>();
  @Output()
  refreshing = new EventEmitter<string>();
  @Output()
  agentEvent = new EventEmitter<AgentModel>();
  @Output()
  bankomatEvent = new EventEmitter<ConsumerModel>();
  @Output()
  clerkEvent = new EventEmitter<ConsumerModel>();
  constructor(private modalService: NgbModal,
              private offCanvas: NgbOffcanvas) {
  }

  ngOnInit(): void {
    this.isDisableStop = true;
  }
  open(content: TemplateRef<any>) {
    this.offCanvas.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  onAddAgent(){
    const modalRef = this.modalService.open(AgentDialogComponent, {size: "lg", scrollable: true});
    modalRef.componentInstance.data = {
      dialogTitle: "Настройка агента",
      buttonTitle: "Сохранить настройки",
      editMode: false,
      item: this.startModel.agent
    }
    modalRef.closed.subscribe(result => {
      this.agent = result;
      this.agentEvent.emit(result);
    });
  }
  onAddBankomat(){
    const modalRef = this.modalService.open(ConsumerDialogComponent, {size: "lg", scrollable: true});
    modalRef.componentInstance.data = {
      dialogTitle: "Настройка банкомата",
      buttonTitle: "Сохранить настройки",
      editMode: false,
      item: this.startModel.consumers[0]
    }
    modalRef.closed.subscribe(result => {
      this.bankomat = result;
      this.bankomatEvent.emit(result);
    });
  }
  onAddClerk(){
    const modalRef = this.modalService.open(ConsumerDialogComponent, {size: "lg", scrollable: true});
    modalRef.componentInstance.data = {
      dialogTitle: "Настройка клерка",
      buttonTitle: "Сохранить настройки",
      editMode: false,
      item: this.startModel.consumers[1]
    }
    modalRef.closed.subscribe(result => {
      this.clerk = result;
      this.clerkEvent.emit(result);
    });
  }
  onTest(): void{
    this.starting.emit("start");
    this.isDisableStop = false;
    this.isDisableStart = true;
  }
  onStop(): void{
    this.stoping.emit("stop");
    this.isDisableStop = true;
    this.isDisableStart = false;
  }
  onRefresh(): void{
    this.refreshing.emit("refresh");
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
