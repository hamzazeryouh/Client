import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Appsettings } from 'src/app/App-settings/app-settings';
import { Candidat, ICandidat } from 'src/app/Models/Candidat.model';
import { CandidatService } from 'src/app/services/candidat.service';
import { PosteNiveauService } from 'src/app/services/poste-niveau.service';
import { PosteService } from 'src/app/services/poste.service';

@Component({
  selector: 'app-viewcandidats',
  templateUrl: './viewcandidats.component.html'
})
export class ViewcandidatsComponent implements OnInit {

  modal = new Candidat();
  form!: FormGroup;
  mode=false;
  Poste!: any;
  Niveau!: any;
  submitted = false;
  postes!: any[];
  posteNiveau!: any[];

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private service: CandidatService,
    private PosteService: PosteService,
    private PosteNiveauService:PosteNiveauService,
    private route:ActivatedRoute
  ) {}
  get error() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.initForm();
    let id=Number(this.route.snapshot.paramMap.get('id'));

      this.mode=true;
      this.service.Get(id).subscribe(data=>{
        this.modal=data;
        this.setCandidatInForm(this.modal);
        this.PosteService.Get(this.modal.posteId).subscribe((data) => {
          let poste =Object.values(data);
          this.Poste=poste[0];
        });
        this.PosteNiveauService.Get(this.modal.posteNiveauId).subscribe(
          (data) => {
            let niveau = Object.values(data);
            this.Niveau=niveau[0];
          }
        );
      });


  
    // Get List PosteNiveau
    this.PosteNiveauService.GetResult().subscribe(result=>{
      this.posteNiveau=Object.values(result);
    });

    
// Get List Poste
    this.PosteService.GetResult().subscribe(result=>{
      this.postes=Object.values(result);
    });

    this.form.disable();
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
      posteId: data.posteId,
      posteNiveauId: data.posteNiveauId,
      commentaire: data.commentaire,
    });
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
