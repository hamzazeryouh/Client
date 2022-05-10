import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { HeaderBarComponent } from './home/header-bar/header-bar.component';
import { ListCandidatsComponent } from './candidats/list-candidats/list-candidats.component';
import { ListCollaborateursComponent } from './collaborateurs/list-collaborateurs/list-collaborateurs.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ToDoComponent } from './to-do/list-todo/to-do.component';
import { MemoComponent } from './memos/memo/memo.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { FormationsComponent } from './formations/formations.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { ReportsComponent } from './reports/reports.component';
import { DemissionsComponent } from './demissions/demissions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AddEditTodoComponent } from './to-do/add-edit-todo/addEditTodo.component';
import {DatePipe, DecimalPipe} from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { CommonModule } from "@angular/common";
import { ListFreelancesComponent } from './freelances/list-freelances/list-freelances.component';
import { AddEditFreelancesComponent } from './freelances/add-edit-freelances/add-edit-freelances.component';
import { AddEditMemosComponent } from './memos/add-edit-memos/add-edit-memos.component';
import { AddEditCandidatComponent } from './candidats/add-edit-candidat/add-edit-candidat.component';
import { AddEditCollaborateurComponent } from './collaborateurs/add-edit-collaborateur/add-edit-collaborateur.component';
import { HttpRequestInterceptor } from './_interceptors/loading.interceptor';
import { FormCandidatComponent } from './Shared/form-candidat/form-candidat.component';
import { DropdownComponent } from './Shared/dropdown/dropdown.component';
import { CustomInputComponent } from './Shared/custom-input/custom-input.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewcandidatsComponent } from './candidats/viewcandidats/viewcandidats.component';
import { PosteComponent } from './MDM/Postes/poste/poste.component';
import { ListPosteComponent } from './MDM/Postes/list-poste/list-poste.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SortableDirective } from './Directives/sortable.directive';
import {  LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
  ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService } from '@syncfusion/ej2-angular-pdfviewer';
import { PdfViewerComponent } from './Shared/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UploadComponent } from './Shared/upload/upload.component';
import { UploadImageComponent } from './Shared/upload-image/upload-image.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { InterceptService } from './services/intercept.service';
import { SplashScreenComponent } from './SplashScreen/splash-screen.component';
import {
  NgxAwesomePopupModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderBarComponent,
    ListCandidatsComponent,
    ListCollaborateursComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ToDoComponent,
    MemoComponent,
    AboutComponent,
      DashboardComponent,
      NotFoundComponent,
      ServerErrorComponent,
      TestErrorsComponent,
      FormationsComponent,
      IntegrationsComponent,
      ReportsComponent,
      DemissionsComponent,
      AddEditTodoComponent,
      ListFreelancesComponent,
      AddEditFreelancesComponent,
      AddEditMemosComponent,
      AddEditCandidatComponent,
      AddEditCollaborateurComponent,
      FormCandidatComponent,
      DropdownComponent,
      CustomInputComponent,
      ViewcandidatsComponent,
      PosteComponent,
      ListPosteComponent,
      SortableDirective,
      PdfViewerComponent,
      UploadComponent,
      UploadImageComponent,
      SplashScreenComponent
      
   ],
   exports:[DropdownComponent,SplashScreenComponent,],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    PdfViewerModule,
    JwPaginationModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
        ToastNotificationConfigModule.forRoot() 
    
  ],

  providers: [
    DecimalPipe,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
   /* {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
  },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
