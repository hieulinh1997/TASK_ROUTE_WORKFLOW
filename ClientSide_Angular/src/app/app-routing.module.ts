import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowrootComponent} from './workflowroot/workflowroot.component';
import { DialogboxComponent} from './dialogbox/dialogbox.component';
import { DialogOverviewExampleDialog} from './workflowroot/workflowroot.component';
import { ContentEditableFormDirective } from './workflowroot/content-editable-form.directive';
const routes: Routes = [
  {path:'',redirectTo:"workflowroot",pathMatch:"full"},
  { path: 'workflowroot', component: WorkflowrootComponent},
  { path: 'dialogbox', component:DialogboxComponent},
  // { path: 'itemdialog', component:DialogOverviewExampleDialog},
  { path: 'workflowroot', component:DialogOverviewExampleDialog},
  { path: 'workflowroot', component:ContentEditableFormDirective}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
