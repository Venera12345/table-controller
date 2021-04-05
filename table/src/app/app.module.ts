import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTableComponent } from './list-table/list-table.component';
import { TableComponent } from './table/table.component';
import { PopupComponent } from './table/popup/popup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './shared/header/header.component';
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoaderComponent } from './shared/loader/loader.component';
import {ModalApproveComponent} from "./shared/modal-approve/modal-approve.component";
import {HttpClientModule} from "@angular/common/http";
import { GraphQLModule } from './graphql.module';
import {APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";

@NgModule({
  declarations: [
    AppComponent,
    ListTableComponent,
    PopupComponent,
    HeaderComponent,
    LoaderComponent,
    TableComponent,
    ModalApproveComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    CdkTableModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  entryComponents: [
    PopupComponent,
    ModalApproveComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
