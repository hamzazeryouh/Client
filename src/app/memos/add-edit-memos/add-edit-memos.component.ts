import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { Location } from '@angular/common';

import jsonDoc from 'src/app/Models/doc';
import { toHTML } from 'ngx-editor';
import { ActivatedRoute } from '@angular/router';
import { memo } from 'src/app/Models/memo';
import { MemoService } from 'src/app/services/memo.service';

@Component({
  selector: 'app-add-edit-memos',
  templateUrl: './add-edit-memos.component.html',
  styleUrls: ['./add-edit-memos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditMemosComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: MemoService,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {}

  editordoc = jsonDoc;
  id: number = 0;
  returnedMemo: memo = new memo();
  isLoading: boolean = false;

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  myform = new FormGroup({
    editorContent: new FormControl(),
    titre: new FormControl(),
  });

  // get doc(): AbstractControl {
  //   return this.form.get("editorContent");
  // }
  saveContent() {
    const html = toHTML(jsonDoc); // schema is optional

    //console.log(html);
    //console.log(this.form.get("editorContent")?.value);
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    //console.log(this.id);

    if (this.id != undefined && this.id != 0) {
      //console.log('call service');
      this.getMemo(this.id);

      // this.myform = this.fb.group({
      //   titre: this.returnedMemo.titre,
      //   editorContent: this.returnedMemo.htmlContent,
      // });
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    //console.log("Destroy add edit component ")
  }

  getMemo(id: number): void {
    this.isLoading = true;
    this.service.getMemoById(id).subscribe((result) => {
      this.returnedMemo = result;
      //console.log(this.returnedMemo);
      this.myform = this.fb.group({
        editorContent: [this.returnedMemo.htmlContent],
        titre: [this.returnedMemo.titre],
      });
      this.isLoading = false;
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('titre', form.value.titre);
    console.log('editorContent', form.value.editorContent);

    console.log(this.returnedMemo);

    if (this.returnedMemo.id == 0) {
      this.returnedMemo.titre = form.value.titre;
      this.returnedMemo.htmlContent = toHTML(form.value.editorContent);

      console.log(this.returnedMemo);
      this.service.addMemo(this.returnedMemo).subscribe((res) => {
        //console.log("end call ");
        this.back();
      });
    }
    else
    {
      //Update
      console.log("Update");
      this.returnedMemo.titre = form.value.titre;
      this.returnedMemo.htmlContent = form.value.editorContent;
      this.service.updateMemo(this.returnedMemo.id, this.returnedMemo).subscribe((res) => {
        //console.log("end call ");
        this.back();
      });
    }
  }
  deleteMemo(){
    this.service.deleteMemo(this.returnedMemo.id).subscribe((res) => {
      this.back();
    });
  }

  back(): void {
    this.location.back();
  }
}
