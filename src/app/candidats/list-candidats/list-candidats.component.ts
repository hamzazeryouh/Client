import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { dataBound } from '@syncfusion/ej2-angular-grids';
import { catchError, Observable, throwError } from 'rxjs';
import { SortableDirective, SortEvent } from 'src/app/Directives/sortable.directive';
import { Candidat, ICandidat } from 'src/app/Models/Candidat.model';
import { IDropDownItem } from 'src/app/Models/generals/IDropDownItem.model';
import { CandidatService } from 'src/app/services/candidat.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import Swal from 'sweetalert2';
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
  @ViewChild('fileInput') fileInput:any; 
  message: string;  
  collabToDelete?: ICandidat;
  active = 1;
  search: string;
  blob:Blob;
  page = 1;
  pageSize = 0;
  form!: FormGroup;
  file:FormData;
  constructor(
    public service: CandidatService,
    private router: Router,
    private ExcelService: ExcelService
  ) {
    this.Candidat$ = service.Candidat$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    //this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

  public uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.service.ImportExcel(formData).subscribe(data=>{

    },
    error=>{
      console.log(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'erreur Importer les candidatures',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    ()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Importer des candidatures a été un succès',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    );
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


  ImportExcel(files:any){
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.service.ImportExcel(formData).subscribe(result=>{
      this.message=result.toString();

      console.log(this.message);
      
  
    });
    this.service.ImportExcel(this.file).subscribe(data=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Import Votre candidatures a été enregistrée ',
        showConfirmButton: false,
        timer: 1500,
      })
      console.log(data);
      
    })
  }

}
