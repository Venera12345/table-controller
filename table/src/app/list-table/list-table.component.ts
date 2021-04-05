import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Table, TableService} from "../shared/service/table.service";
import {Apollo} from "apollo-angular";
import {PopupComponent} from "../table/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {
  tables: Table[] | undefined;
  loader: boolean = false;
  textEmpty: boolean = false;
  error: boolean = false;
  active: string = '';

  constructor(private router: Router,
              private tableService: TableService,
              private matDialog: MatDialog,
              private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.load('');
  }

  load(type: string) {
    this.error = false;
    this.loader = true;
    this.tables = [];
    this.apollo.query<{ getTable: Table[] }>({
      query: this.tableService.GET_TABLE,
      variables: {
        type: type
      },
      fetchPolicy: 'network-only'
    }).subscribe(({data, loading}) => {
      this.loader = loading;
      if (data.getTable) {
        this.tables = data.getTable
        this.textEmpty = this.tables.length === 0;
      }
    }, error1 => {
      this.loader = false;
      this.error = true;
    });
  }

  goToTable(uuid: string | undefined) {
    this.router.navigate([uuid])
  }

  filterTable(type: string) {
    this.active = type;
    this.load(type);
  }

  addTable() {
    this.matDialog.open(PopupComponent, {
      autoFocus: true,
      data: {
        type: 'add-table'
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.load('');
      }
    })
  }

}
