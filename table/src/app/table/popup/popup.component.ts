import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Client, TableService} from "../../shared/service/table.service";
import {Apollo} from "apollo-angular";

export interface ModalData {
  type: string
  uuid?: string
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
  customers: any;
  form: any;
  listClient: Client[] | undefined;
  loader: boolean = false;
  error: boolean = false;

  constructor(public matDialogRef: MatDialogRef<PopupComponent>,
              private formBuilder: FormBuilder,
              private apollo: Apollo,
              private tableService: TableService,
              @Inject(MAT_DIALOG_DATA) public data: ModalData) {
  }

  ngOnInit(): void {
    if (this.data.type === 'add-order') {
      this.loadClient();
    }
    if (this.data.type !== 'add-order') {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]]
      })
    } else {
      this.form = this.formBuilder.group({
        client: [' ', [Validators.required, Validators.minLength(2)]],
        describe: ['', [Validators.required, Validators.minLength(3)]]
      })
    }
  }

  loadClient() {
    this.apollo.query<{ getClient: Client[] }>({
      query: this.tableService.GET_CLIENT_LIST,
      variables: {
        id: this.data.uuid
      },
      fetchPolicy: 'network-only'
    }).subscribe(({data, loading}) => {
      if (data.getClient) {
        this.listClient = data.getClient
      }
    });
  }

  createOrder() {
    this.loader = true;
    this.apollo.mutate<any>({
      mutation: this.tableService.POST_ORDER,
      variables: {
        describe: this.form.get('describe').value,
        client: this.form.get('client').value
      }
    }).subscribe(({data}) => {
      this.matDialogRef.close(data.postOrder)
    }, error => {
      this.loader = false;
      this.error = true;
    });
  }

  createClient() {
    this.loader = true;
    this.apollo.mutate<any>({
      mutation: this.tableService.POST_CLIENT,
      variables: {
        name: this.form.get('name').value,
        table: this.data.uuid
      }
    }).subscribe((data) => {
      const res = data.data
      this.matDialogRef.close(res)
    }, error => {
      this.loader = false;
      this.error = true;
    });
  }

  createTable() {
    this.loader = true;
    this.apollo.mutate<any>({
      mutation: this.tableService.POST_TABLE,
      variables: {
        name: this.form.get('name').value
      }
    }).subscribe(({data}) => {
      this.loader = false;
      this.matDialogRef.close(data.postTable)
    }, error => {
      this.loader = false;
      this.error = true;
    });
  }

}
