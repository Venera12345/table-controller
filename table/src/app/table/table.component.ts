import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "./popup/popup.component";
import {ModalApproveComponent} from "../shared/modal-approve/modal-approve.component";
import {TableService, Client, Table} from "../shared/service/table.service";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource: Client[] | undefined;
  displayedColumns: string [] = ['customer-name', 'order-describe', 'order-status', 'btn'];
  loader = '';
  loaderTable = false;
  id: string | undefined;
  error: boolean = false;
  errorExecute: string = '';

  constructor(private router: Router,
              private activeRouter: ActivatedRoute,
              private tableService: TableService,
              private apollo: Apollo,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    this.load();
  }

  load() {
    this.errorExecute = '';
    this.error = false;
    this.loaderTable = true;
    this.apollo.query<{ getClient: Client[] }>({
      query: this.tableService.GET_CLIENT,
      variables: {
        id: this.id
      },
      fetchPolicy: 'network-only'
    }).subscribe(({data, loading}) => {
      this.loaderTable = loading;
      if (data.getClient) {
        this.dataSource = data.getClient;
        this.loader = '';
      }
    }, error1 => {
      this.loaderTable = false;
      this.error = true;
    });
  }

  goBack() {
    this.router.navigate(['/'])
  }

  addClient() {
    this.matDialog.open(PopupComponent, {
      autoFocus: true,
      data: {
        type: 'add-client',
        uuid: this.id
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.load()
      }
    })
  }

  addOrder() {
    this.matDialog.open(PopupComponent, {
      autoFocus: true,
      data: {
        type: 'add-order',
        uuid: this.id
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.load()
      }
    })
  }

  execute(id: string, index: number) {
    this.errorExecute = '';
    this.loader = id;
    this.apollo.mutate<any>({
      mutation: this.tableService.PUT_ORDER,
      variables: {
        id,
        table: this.id
      }
    }).subscribe((data) => {
      if (data) {
        this.load();
      }
    }, error1 => {
      this.loader = '';
      this.errorExecute = id;
    });
  }

  delete(id: string) {
    this.matDialog.open(ModalApproveComponent, {
      autoFocus: true,
      data: {
        uuid: id
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.dataSource = this.dataSource?.filter((a) => {
          return a.id !== id
        })
      }
    })
  }
}
