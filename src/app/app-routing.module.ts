import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },  // Schutz der Route
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },  // Schutz der Route
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },  // Schutz der Route
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },  // Schutz der Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
