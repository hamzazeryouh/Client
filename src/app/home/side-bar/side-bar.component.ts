import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {


  toggel=true;
  toggeladmin=false;
  constructor() { }

  ngOnInit(): void {
  }

  sidetoggel(){
this.toggel=!this.toggel;
this.toggeladmin=!this.toggeladmin;
  }

}
