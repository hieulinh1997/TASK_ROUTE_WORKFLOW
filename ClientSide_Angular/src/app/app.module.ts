import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { WorkflowrootComponent} from './workflowroot/workflowroot.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
// import {MatRippleModule} from '@angular/material/core';
// import {MatButtonModule} from '@angular/material/button';
// import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } 
// from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatRippleModule,
  MatTableModule,
} from '@angular/material';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { DialogOverviewExampleDialog } from './workflowroot/workflowroot.component';
import { ContentEditableFormDirective } from './workflowroot/content-editable-form.directive';
@NgModule({
  declarations: [
    AppComponent,
    WorkflowrootComponent,
    // ItemdialogComponent,
    DialogOverviewExampleDialog,
    ContentEditableFormDirective,
    DialogboxComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, MatMomentDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    MatTableModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule
  ],
  entryComponents: [
    // DialogboxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
