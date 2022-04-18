import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICandidat } from 'src/app/Models/Candidat.model';

import { IDropDownItem } from 'src/app/Models/generals/IDropDownItem.model';
import { CandidatService } from 'src/app/services/candidat.service';
import * as XLSX from 'xlsx'; 
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
fileName:string = 'ExcelSheet.xlsx';  
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

Export(){

   /* table id is passed over here */   
   let element = document.getElementById('excel-table'); 
   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

   /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   /* save to file */
   XLSX.writeFile(wb, this.fileName);
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
