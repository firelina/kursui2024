import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AgentModel} from "../../model/AgentModel";

@Component({
  selector: 'app-agent-dialog',
  templateUrl: './agent-dialog.component.html',
  styleUrls: ['./agent-dialog.component.css']
})
export class AgentDialogComponent {
  dialogTitle: string;
  data: any;
  buttonTitle: string;
  agent: AgentModel;
  formGroup: FormGroup;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(this.data) {
      this.dialogTitle = this.data.dialogTitle;
      this.buttonTitle = this.data.buttonTitle;
      this.agent = this.data.item;
      this.initFormGroup();
    }
  }
  initFormGroup(): void{
    this.formGroup = new FormGroup({
      prefTitle: new FormControl({value: this.agent.prefTitle, disabled: false}, {nonNullable: true, validators: [Validators.minLength(1), Validators.required]}),
      firstDelay: new FormControl({value: this.agent.firstDelay, disabled: false}, {nonNullable: true, validators: [Validators.min(1), Validators.required]}),
      secondDelay: new FormControl({value: this.agent.secondDelay, disabled: false}, {nonNullable: true, validators: [Validators.min(0), Validators.required]}),
      thirdDelay: new FormControl({value: this.agent.thirdDelay, disabled: false}, {nonNullable: true, validators: [Validators.min(1), Validators.required]}),
    });
  }
  get getPrefTitleField(): AbstractControl{
    return this.formGroup.get('prefTitle');
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
    this.agent.prefTitle = this.getPrefTitleField.value;
    this.agent.firstDelay = this.getFirstDelayField.value;
    this.agent.secondDelay = this.getSecondDelayField.value;
    this.agent.thirdDelay = this.getThirdDelayField.value;
    this.activeModal.close(this.agent);
  }
  onCancel(){
    this.activeModal.dismiss();
  }
}
