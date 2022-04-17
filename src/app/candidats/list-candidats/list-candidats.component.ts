import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICandidat } from 'src/app/Models/Candidat.model';

import { IDropDownItem } from 'src/app/Models/generals/IDropDownItem.model';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-list-candidats',
  templateUrl: './list-candidats.component.html',
  styleUrls: ['./list-candidats.component.css']
})
export class ListCandidatsComponent implements OnInit {
CandidatsArray: ICandidat[] = [];
collabToDelete?: ICandidat;
//pagination!: Pagination;
pageNumber = 1;
pageSize = 10;
form!:FormGroup;

constructor(private service: CandidatService,private router:Router) { }

ngOnInit(): void {
  this.loadCandidats();
}

Get(id:number){
    this.router.navigate([ `/addEditcandidats/${id}`]);
}

View(id:number){
  this.router.navigate([ `/View/${id}`]);
}

loadCandidats() {
  this.service.GetResult().subscribe(resp => {
    this.CandidatsArray = resp;
  })
}

deleteCollab(id:any): void {
  this.collabToDelete = id;
}

confirmDelete(id:any): void {
  if (id) {
    this.service.Delete(id).subscribe(res => {
      console.log("deletion success!");
      this.loadCandidats();
    });
  }
}
pageChanged(even: any) {
  this.pageNumber = even.page;
  this.loadCandidats();
}
  

}
