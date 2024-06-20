import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { SignupComponent } from './signup/signup.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MenuComponent } from './menu/menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import { DialogEditContactComponent } from './contacts/dialog-edit-contact/dialog-edit-contact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddContactComponent } from './contacts/dialog-add-contact/dialog-add-contact.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import {AuthService} from "./services/auth.service";
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { NewCategoryComponent } from './add-task/new-category/new-category.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { NewTaskDialogComponent } from './board/new-task-dialog/new-task-dialog.component';
import { ShowContactComponent } from './contacts/show-contact/show-contact.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SummaryComponent,
    BoardComponent,
    AddTaskComponent,
    ContactsComponent,
    MenuComponent,
    DialogEditContactComponent,
    DialogAddContactComponent,
    TaskDialogComponent,
    EditTaskDialogComponent,
    NewCategoryComponent,
    NewTaskDialogComponent,
    ShowContactComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatMenuModule,
        MatDialogModule,
        DragDropModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatProgressBarModule,
    ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
