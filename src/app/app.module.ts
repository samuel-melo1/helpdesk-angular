import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatRadioModule } from '@angular/material/radio'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component'


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
