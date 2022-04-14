import { Component, OnInit } from '@angular/core';
import { collaborateur } from 'src/app/Models/collaborateur';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-list-collaborateurs',
  templateUrl: './list-collaborateurs.component.html',
  styleUrls: ['./list-collaborateurs.component.css']
})
export class ListCollaborateursComponent implements OnInit {
  collaboratorsArray: collaborateur[] = [];
  collabToDelete?: collaborateur = new collaborateur();
  //pagination!: Pagination;
  pageNumber = 1;
  pageSize = 10;

  constructor(private service: CollaborateurService) { }

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators() {
    this.service.getCollaborateursList().subscribe(resp => {
      this.collaboratorsArray = resp;
    })
  }

  deleteCollab(id:any): void {
    this.collabToDelete = id;
  }
  confirmDelete(id:any): void {
    if (id) {
      this.service.deleteCollaborateur(id).subscribe(res => {
        console.log("deletion success!");
        this.loadCollaborators();
      });
    }
  }
  pageChanged(even: any) {
    this.pageNumber = even.page;
    this.loadCollaborators();
  }
}
