import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-edit-candidat',
  templateUrl: './add-edit-candidat.component.html',
  styleUrls: ['./add-edit-candidat.component.css']
})
export class AddEditCandidatComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back()
  }

}
