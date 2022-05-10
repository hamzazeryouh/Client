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
import { environment } from 'src/environments/environment';
import { Evaluation, IEvaluation } from 'src/app/Models/Evaluation';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { TemplateService } from 'src/app/services/template.service';
import { commenterService } from 'src/app/services/commenter.service';
import { ITemplate, Template } from 'src/app/Models/Template';
import { Commenter, ICommenter } from 'src/app/Models/Commenter';
import { ThumbnailViewService } from '@syncfusion/ej2-angular-pdfviewer';

@Component({
  selector: 'app-add-edit-candidat',
  templateUrl: './add-edit-candidat.component.html',
  styleUrls: ['./add-edit-candidat.component.css'],
})
export class AddEditCandidatComponent implements OnInit {
  modal: Candidat = new Candidat();
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
  iditem: number;
  ImageUrl = '';
  pdfSrc = '';
  Ev: Evaluation = new Evaluation();
  ListTemplate: any[];
  EvMode = false;
  ListEvaluation: any[];
  //begin from  Evaluation
  TemplateMode = false;
  Templateid: Number;
  evaluationModal: Evaluation = new Evaluation();
  templatemodal: Template = new Template();
  CommenteModal: Commenter = new Commenter();
  Evaluateur: '';
  DateEntretien: '';
  CandidatId: 0;
  CommenterId: 0;
  TemplateId: 0;
  EvaluationData: any[];
  // end evaluation

  //begin Template model

  //end template model
  endPoint: string = `${environment.URL}api/Candidat`;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private service: CandidatService,
    private PosteService: PosteService,
    private EvaluationService: EvaluationService,
    private TemplateService: TemplateService,
    private CommenterService: commenterService,
    private PosteNiveauService: PosteNiveauService,
    private route: ActivatedRoute,
    private Router: Router
  ) {}
  get error() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.RefrechData();
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
    this.GetListEvaluation(Number(this.id));
    this.iditem = Number(this.id);
    if (this.id !== 0) {
      this.mode = true;
      this.RefrechData();
    }
  }

  RefrechData() {
    this.service.Get(Number(this.id)).subscribe((data) => {
      this.modal = data;
      this.ImageUrl = String(this.modal.imageUrl);
      this.setCandidatInForm(this.modal);
      this.Nom = this.modal.nom;
      this.Prenom = this.modal.prenom;
      this.Civilite = this.modal?.civilite;
      this.PosteService.Get(this.modal.posteId).subscribe((data) => {
        let P = Object.values(data);
        this.Poste = P[0];
      });
      this.PosteNiveauService.Get(this.modal.posteNiveauId).subscribe(
        (data) => {
          let N = Object.values(data);
          this.Niveau = N[0];
        }
      );
      this.GetImage(this.modal?.imageUrl);
    });

    //
  }

  GetEvaluationData() {
    //this.EvaluationService.Get(this.)
  }

  back(): void {
    this.location.back();
  }

  GetImage(image: any) {
    return this.endPoint + '/GetFile/' + `${image}`;
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
      this.modal = this.form.value;
      this.service.Add(this.modal).subscribe();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Votre candidature a été enregistrée',
        showConfirmButton: false,
        timer: 1500,
      });
      this.form.reset();
      this.Router.navigate([`/candidats`]);
    } else {
      this.modal = this.form.value;
      this.modal.id = Number(this.route.snapshot.paramMap.get('id'));
      console.log(this.modal);

      this.service.Update(String(this.id), this.modal).subscribe((data) => {
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

      this.RefrechData();
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

  GetListEvaluation(id: number) {
    this.EvaluationService.GetEvaluationByCandidat(id).subscribe((data) => {
      if (data != null) {
        this.EvMode = true;
      }
      this.evaluationModal.id = data?.evaluation.id;
      this.evaluationModal.DateEntretien = data?.evaluation?.dateEntretien;
      this.evaluationModal.Evaluateur = data?.evaluation?.evaluateur;

      this.ListTemplate = data?.template;
      this.CommenteModal = data?.evaluation?.commenter;
      console.log(this.ListTemplate);

      console.log(data);
    });
  }

  addTemplate() {
    if (this.evaluationModal.id == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous devez ajouter Candidate First !',
      });
    }
    this.templatemodal.EvaluationId = this.evaluationModal.id;
    if (this.TemplateMode == true) {
      this.TemplateService.Update(
        this.Templateid.toString(),
        this.templatemodal
      ).subscribe((data) => {});
    } else {
      this.TemplateService.Add(this.templatemodal).subscribe((data) => {
        this.ListTemplate.push(data);
      });
      this.templatemodal = new Template();
      this.GetListEvaluation(Number(this.id));
    }
  }

  AddCommenter() {
    this.CommenterService.Add(this.CommenteModal).subscribe((data) => {
      this.evaluationModal.CommenterId = Number(data.id);
      console.log(data.id);
    });
  }


  EditCommenter(){
    this.CommenterService.Update(this.CommenteModal.id.toString(), this.CommenteModal).subscribe((data) => {
      this.evaluationModal.CommenterId = Number(data.id);
      console.log(data.id);
    });
  }

  AddEvaluation() {
    if ((this.EvMode == false)) {
      debugger;
      this.evaluationModal.CandidatId = Number(this.id);
      this.AddCommenter();
      this.EvaluationService.Add(this.evaluationModal).subscribe((data) => {
        this.templatemodal.EvaluationId = data.id;
        this.evaluationModal = data;
        //this.addTemplate();
        this.templatemodal = new Template();
        this.EvMode = true;
      });
    } else {
      this.EditCommenter();
      this.EvaluationService.Update(
        this.evaluationModal.id.toString(),
        this.evaluationModal
      ).subscribe((data) => {
        this.templatemodal.EvaluationId = data.id;
        this.evaluationModal = data;
        this.addTemplate();
        this.EvMode = true;
      });
    }
  }

  EditTemplate(id: Number) {
    this.TemplateMode = true;
    this.TemplateService.Get(Number(id)).subscribe((data) => {
      this.templatemodal.note = data.note;
      this.templatemodal.title = data.title;
      this.templatemodal.technologie = data.technologie;
      this.templatemodal.them = data.them;
      this.Templateid = data.id;
    });
  }

  deleteTemplate(id: Number) {
    this.TemplateService.Delete(Number(id)).subscribe((data) => {
      // this.ListTemplate=[];
    });
debugger;
    this.GetListEvaluation(Number(this.id));
  
  }
}
