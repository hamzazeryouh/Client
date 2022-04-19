import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from 'src/app/Directives/sortable.directive';
import { Candidat, ICandidat } from 'src/app/Models/Candidat.model';

import { IDropDownItem } from 'src/app/Models/generals/IDropDownItem.model';
import { CandidatService } from 'src/app/services/candidat.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-list-candidats',
  templateUrl: './list-candidats.component.html',
  styleUrls: ['./list-candidats.component.css'],
 // providers: [CandidatService, DecimalPipe],
})
export class ListCandidatsComponent implements OnInit {
  Candidat$: Observable<ICandidat[]>;
  total$: Observable<number>;
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  

  collabToDelete?: ICandidat;
  // Excel init
  importCandidat: Candidat[] = [];
  exportCandidat: Candidat[] = [];
  search: string;
  page = 1;
  pageSize = 10;
  form!: FormGroup;
  fileName: string = 'ExcelSheet.xlsx';
  constructor(
    public service: CandidatService,
    private router: Router,
    private ExcelService: ExcelService
  ) {

    this.Candidat$ = service.Candidat$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
   
    
  }


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  Get(id: number) {
    this.router.navigate([`/addEditcandidats/${id}`]);
  }
  // Function Search
  Search() {
    this.Candidat$.subscribe(data=>{
      data.filter(e=>{
        e.civilite?.includes(this.search) &&
        e.nom?.includes(this.search) &&
        e.prenom?.includes(this.search) &&
        e.dateDeNaissance?.includes(this.search) &&
        e.datePremiereExperience?.includes(this.search) &&
        e.email?.includes(this.search) &&
        e.niveau?.includes(this.search) &&
        e.emploiEncore?.includes(this.search) &&
        e.residenceActuelle?.includes(this.search);
      })
    })
  }

  View(id: number) {
    this.router.navigate([`/View/${id}`]);
  }
  
  Export() {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  deleteCollab(id: any): void {
    this.collabToDelete = id;
  }

  confirmDelete(id: any): void {
    if (id) {
      this.service.Delete(id).subscribe((res) => {
        console.log('deletion success!');

      });
    }
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = <any[]>this.ExcelService.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new Candidat());
      const importedData = data.slice(1, -1);
      let obj: any;
      this.importCandidat = importedData.map((arr) => {
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <ICandidat>obj;
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public exportToFile(fileName: string, element_id: string) {
    if (!element_id) throw new Error('Element Id does not exists');

    let tbl = document.getElementById(element_id);
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
}
