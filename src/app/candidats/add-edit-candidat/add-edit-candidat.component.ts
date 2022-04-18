import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Appsettings } from 'src/app/App-settings/app-settings';
import { CandidatService } from 'src/app/services/candidat.service';
import { MDM } from 'src/app/Models/MDM';
import { PosteService } from 'src/app/services/poste.service';
import { PosteNiveauService } from 'src/app/services/poste-niveau.service';
import { Candidat, ICandidat } from 'src/app/Models/Candidat.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SideBarComponent } from 'src/app/home/side-bar/side-bar.component';

@Component({
  selector: 'app-add-edit-candidat',
  templateUrl: './add-edit-candidat.component.html',
  styleUrls: ['./add-edit-candidat.component.css'],
})
export class AddEditCandidatComponent implements OnInit {
  modal:Candidat  = new Candidat();
  Civilite?: string | null;
  Nom: string | null;
  Prenom!: string | null;
  Poste!: any;
  Niveau!: any;
  form!: FormGroup;
  mode = false;
  submitted = false;
  postes!: any[];
  posteNiveau!: any[];
  id: Number;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private service: CandidatService,
    private PosteService: PosteService,
    private PosteNiveauService: PosteNiveauService,
    private route: ActivatedRoute,
    private Router:Router
  ) {}
  get error() {
    return this.form.controls;
  }

  get nom() {
    return this.form.get('nom');
  }
  ngOnInit(): void {
    this.initForm();
    // Get List PosteNiveau
    this.PosteNiveauService.GetResult().subscribe((result) => {
      this.posteNiveau = Object.values(result);
    });
    // Get List Poste
    this.PosteService.GetResult().subscribe((result) => {
      this.postes = Object.values(result);
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== 0) {
      this.mode = true;
      this.service.Get(Number(this.id)).subscribe((data) => {
        this.modal = data;
        this.setCandidatInForm(this.modal);
        this.Nom = this.modal.nom;
        this.Prenom = this.modal.prenom;
        this.Civilite = this.modal?.civilite;
        this.PosteService.Get(this.modal.posteId).subscribe((data) => {
          let P = Object.values(data);
          this.Poste=P[0];
        });
        this.PosteNiveauService.Get(this.modal.posteNiveauId).subscribe(
          (data) => {
            let N= Object.values(data);
            this.Niveau =N[0];
          }
        );
      });
    }
  }




  back(): void {
    this.location.back();
  }

  setCandidatInForm(data: ICandidat) {
    this.form.setValue({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      civilite: data.civilite,
      datePremiereExperience: data.datePremiereExperience,
      dateNaissance: data.dateNaissance,
      salaireActuel: data.salaireActuel,
      propositionSalariale: data.propositionSalariale,
      residenceActuelle: data.residenceActuelle,
      emploiEncore: data.emploiEncore,
      posteId: data.posteId ?? data.posteId[1],
      posteNiveauId: data.posteNiveauId ?? data.posteNiveauId[1],
      commentaire: data.commentaire,
    });
  }

  // Process checkout data here
  
  save() {

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    console.log(this.mode);
    if (this.mode == false) {
      this.modal=this.form.value;
      this.service.Add(this.modal).subscribe();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Votre candidature a été enregistrée',
        showConfirmButton: false,
        timer: 1500,
      });
      this.form.reset();
      this.Router.navigate([ `/candidats`]);
    } else {
      debugger;
      
      this.modal=this.form.value;
      this.modal.id=Number(this.route.snapshot.paramMap.get('id'));
      console.log(this.modal);
      
      this.service
        .Update(String(this.id), this.modal)
        .subscribe((data) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Votre candidature a été mise à jour',
            showConfirmButton: false,
            timer: 1500,
          }).catch((error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Votre candidature a été mise à jour',
              showConfirmButton: false,
              timer: 1500,
            });
          });
        });
    }
  }
  initForm() {
    this.form = this.fb.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      email: [null, [Validators.pattern(Appsettings.regexEmail)]],
      telephone: [null, [Validators.pattern(Appsettings.regexPhone)]],
      civilite: [null, [Validators.required]],
      datePremiereExperience: [null, [Validators.required]],
      dateNaissance: [null, [Validators.required]],
      salaireActuel: [null],
      propositionSalariale: [null],
      residenceActuelle: [null],
      emploiEncore: [null],
      posteId: [null, [Validators.required]],
      posteNiveauId: [null, [Validators.required]],
      commentaire: [null],
    });
  }
}
