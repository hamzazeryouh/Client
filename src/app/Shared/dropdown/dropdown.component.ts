import { Component, Input, OnInit } from '@angular/core';
import { IDropDownItem } from 'src/app/Models/generals/IDropDownItem.model';
import { MDM } from 'src/app/Models/MDM';
import { BaseCustomUiComponent } from '../base-custom-ui/base-custom-ui.component';

@Component({
  selector: 'Kt-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent<TValue, TText> extends BaseCustomUiComponent implements OnInit {

    @Input()
    showAny = true;
    @Input() set data(val: IDropDownItem<TValue, TText>[]) {
        if (val !== null) {
            this.dropDownItems = val;
        }
    }

    dropDownItems: IDropDownItem<TValue, TText>[] = [];

    constructor() {
        super();
    }
  ngOnInit(): void {
   
  }

    onSelectionChangedChanged(event:any) {
        this.changeEvent.emit(event);
    }


}
