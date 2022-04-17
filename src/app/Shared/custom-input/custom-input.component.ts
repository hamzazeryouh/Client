import { Component, OnInit } from '@angular/core';
import { BaseCustomUiComponent } from '../base-custom-ui/base-custom-ui.component';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent extends BaseCustomUiComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
