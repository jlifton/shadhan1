import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";
import {Observable} from "rxjs";
import {OperatorsService} from "./operators.service";
import {OperatorDTO} from "./operator.data";
import {OperatorDialogComponent} from "./operator-dialog/operator-dialog.component";

@Component({
  selector: 'fury-operators-table',
  templateUrl: './operators-table.component.html',
  styleUrls: ['./operators-table.component.scss']
})
export class OperatorsTableComponent implements OnInit {
  rows: any[];
  operators: OperatorDTO[] = new Array<OperatorDTO>();
  dataSource = new OperatorsDataSource();

  constructor(private operatorsService: OperatorsService,
              private snackbar: MatSnackBar,
              public dialog: MatDialog) {

  }

  createOperator() {
    const dialogConfig = new MatDialogConfig();
    let newOperatorDTO = new OperatorDTO(null);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = newOperatorDTO;
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    const dialogRef = this.dialog.open(OperatorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      newOperator => {
        delete newOperator.title;
        console.log("Dialog output:", newOperator);

        this.operatorsService.createOperator(newOperator).subscribe(
          data => {
            console.log("Create operator succeeded", data);
            this.snackbar.open('Operator ' + data.name + ' successfully added', null, {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            this.getOperators();
          },
          error => {
            console.error("Error creating Operator");
            this.snackbar.open('Problem creating Operator', 'Ok', {
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            return Observable.throw(error);
         });
      });
  }

  ngOnInit() {
    this.getOperators();
  }

  getOperators() {
    this.operatorsService.getOperators().subscribe(
      data => {
       this.operators = data;
       this.dataSource.data.next(this.operators);
      },
      error => {
        console.error("Error getting Operators");
        return Observable.throw(error);
      }
    );
  };

  deleteOperator(row) {
    if(confirm("Delete Operator "+row.name + ' ?')) {
      this.operatorsService.deleteOperator(row._id).subscribe(
        data => {
          this.snackbar.open('Operator ' + row.name + ' deleted', null, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.getOperators();
        },
        error => {
          console.error("Error deleting Operator");
          this.snackbar.open('Problem deleting Operator', 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          return Observable.throw(error);
        }
      );
    }
  }

  editOperator(row: OperatorDTO) {
    const dialogConfig = new MatDialogConfig();
    let clonedOperatorDTO = new OperatorDTO(row);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = clonedOperatorDTO;
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight =650;
    const dialogRef = this.dialog.open(OperatorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      updateOperator => {
        delete updateOperator.title;
        delete updateOperator.password;
        const _id = updateOperator._id;
        delete updateOperator._id;
        console.log("Dialog output:", updateOperator);

        this.operatorsService.updateOperator(_id, updateOperator).subscribe(
          data => {
            console.log("Update operator succeeded", data);
            this.snackbar.open('Operator ' + data.name + ' successfully updated', null, {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            this.getOperators();
          },
          error => {
            console.error("Error updating Operator");
            this.snackbar.open('Problem updating Operator', 'Ok', {
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            return Observable.throw(error);
          });
      });

  }
}

export class OperatorsDataSource implements DataSource<OperatorDTO> {
  /** Stream of data that is provided to the table. */
  data: BehaviorSubject<OperatorDTO[]> = new BehaviorSubject<OperatorDTO[]>([]);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<OperatorDTO[]> {
    return this.data.asObservable();
  }

  disconnect() {
  }
}

