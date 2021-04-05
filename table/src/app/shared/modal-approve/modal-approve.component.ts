import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Apollo} from "apollo-angular";
import {TableService} from "../service/table.service";

@Component({
  selector: 'app-modal-approve',
  templateUrl: './modal-approve.component.html',
  styleUrls: ['./modal-approve.component.scss']
})
export class ModalApproveComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalApproveComponent>,
              private apollo: Apollo,
              private tableService: TableService,
              @Inject(MAT_DIALOG_DATA) public data: { uuid: string }) {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  delete() {
    this.apollo.mutate<any>({
      mutation: this.tableService.DELETE_CLIENT,
      variables: {
        id: this.data.uuid
      }
    }).subscribe(({data}) => {
      if (data) {
        this.dialogRef.close(true)
      }

    });
  }
}
