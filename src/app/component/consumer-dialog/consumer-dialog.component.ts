import { Component } from '@angular/core';
import {AgentModel} from "../../model/AgentModel";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ConsumerModel} from "../../model/ConsumerModel";

@Component({
  selector: 'app-consumer-dialog',
  templateUrl: './consumer-dialog.component.html',
  styleUrls: ['./consumer-dialog.component.css']
})
export class ConsumerDialogComponent {
  dialogTitle: string;
  data: any;
  buttonTitle: string;
  consumer: ConsumerModel;
  formGroup: FormGroup;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(this.data) {
      this.dialogTitle = this.data.dialogTitle;
      this.buttonTitle = this.data.buttonTitle;
      this.consumer = this.data.item;
      this.initFormGroup();
    }
  }
  initFormGroup(): void{
    this.formGroup = new FormGroup({
      prefTitle: new FormControl({value: this.consumer.prefTitle, disabled: false}, {nonNullable: true, validators: [Validators.minLength(1), Validators.required]}),
      count: new FormControl({value: this.consumer.count, disabled: false}, {nonNullable: true, validators: [Validators.min(1), Validators.required]}),
      timeLimit: new FormControl({value: this.consumer.timeLimit, disabled: false}, {nonNullable: true, validators: [Validators.min(1), Validators.required]}),
      firstDelay: new FormControl({value: this.consumer.firstDelay, disabled: false}, {nonNullable: true, validators: [Validators.min(1), Validators.required]}),
      secondDelay: new FormControl({value: this.consumer.secondDelay, disabled: false}, {nonNullable: true, validators: [Validators.min(0), Validators.required]}),
      thirdDelay: new FormControl({value: this.consumer.thirdDelay, disabled: false}, {nonNullable: true, validators: [Validators.min(1), Validators.required]}),
    });
  }
  get getPrefTitleField(): AbstractControl{
    return this.formGroup.get('prefTitle');
  }
  get getCountField(): AbstractControl{
    return this.formGroup.get('count');
  }
  get getTimeLimitField(): AbstractControl{
    return this.formGroup.get('timeLimit');
  }
  get getFirstDelayField(): AbstractControl{
    return this.formGroup.get('firstDelay');
  }
  get getSecondDelayField(): AbstractControl{
    return this.formGroup.get('secondDelay');
  }
  get getThirdDelayField(): AbstractControl{
    return this.formGroup.get('thirdDelay');
  }
  onAction() {
    if(this.formGroup.invalid){
      return;
    }
    this.consumer.prefTitle = this.getPrefTitleField.value;
    this.consumer.count = this.getCountField.value;
    this.consumer.timeLimit = this.getTimeLimitField.value;
    this.consumer.firstDelay = this.getFirstDelayField.value;
    this.consumer.secondDelay = this.getSecondDelayField.value;
    this.consumer.thirdDelay = this.getThirdDelayField.value;
    this.activeModal.close(this.consumer);
  }
  onCancel(){
    this.activeModal.dismiss();
  }
}
