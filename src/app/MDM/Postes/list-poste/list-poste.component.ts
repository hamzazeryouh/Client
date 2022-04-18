import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMDM, MDM } from 'src/app/Models/MDM';
import { PosteService } from 'src/app/services/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-poste',
  templateUrl: './list-poste.component.html',
})
export class ListPosteComponent implements OnInit {
  Delete?: IMDM;
  Postes: any[];
  modal:MDM=new MDM();
  name!: string;
  constructor(private Service: PosteService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadPoste();
  }
  View(id: number) {
    this.router.navigate([`/Poste/View/${id}`]);
  }

  loadPoste() {
    this.Service.GetResult().subscribe((data) => {
      this.Postes = data;
    });
  }

  delete(id: any): void {
    this.Delete = id;
  }

  save(){
    if(this.name==null || this.name=='')
    return;
this.modal.Name=this.name;
this.modal.id=0;
  this.Service.Add(this.modal).subscribe(data=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Votre candidature a été enregistrée',
      showConfirmButton: false,
      timer: 1500,
    });

    this.name='';
  
    this.loadPoste();
  });

  }

  confirmDelete(id: any): void {
    if (id) {
      this.Service.Delete(id).subscribe((res) => {
        console.log('deletion success!');
        this.loadPoste();
      });
    }
  }
}
