import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs";
import {OperatorsService} from "./operators.service";
import {OperatorDTO} from "./operator.data";
import {OperatorDialogComponent} from "./operator-dialog/operator-dialog.component";
import {AuthGuardService} from "../../auth/auth.service";

@Component({
  selector: 'fury-operators-table',
  templateUrl: './operators-table.component.html',
  styleUrls: ['./operators-table.component.scss']
})
export class OperatorsTableComponent implements OnInit {
  rows: any[];
  operators: OperatorDTO[] = new Array<OperatorDTO>();
  dataSource: MatTableDataSource<OperatorDTO> = null;
  pageSize = 7;
  highlightedRows = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private operatorsService: OperatorsService,
              private authGuardService: AuthGuardService,
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

        newOperator.name = newOperator.name.trim();
        newOperator.phone = newOperator.phone.trim();
        newOperator.email = newOperator.email.trim();
        newOperator.street = newOperator.street.trim();
        newOperator.city = newOperator.city.trim();
        newOperator.country = newOperator.country.trim();
        newOperator.username = newOperator.username.trim();
        newOperator.password = newOperator.password.trim();
        //newOperator.notes = newOperator.notes.trim();

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
            console.error("Error creating Operator");;
            let errMsg = 'Problem creating Operator';
            if (error.error !== undefined)
              errMsg = errMsg + '. Details: '+error.error;
            this.snackbar.open(errMsg, 'Ok', {
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
      (data: OperatorDTO[]) => {
        this.operators = data;
        let previousActiveSort = 'name';
        if (this.dataSource != null){
          previousActiveSort = this.sort.active;
          //previousSortDirection = this.sort.direction;
        }
        this.dataSource = new MatTableDataSource(< OperatorDTO[] > this.operators);
        this.sort.active = 'name';
        this.dataSource.sort = this.sort;



        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          return this.handleSortAccessor(item, property);
        };
        this.sort.active = previousActiveSort;
        this.dataSource.sort = this.sort;
        //this.sort.direction =  previousSortDirection;
      },
      error => {
        console.error("Error getting Operators");
        let errMsg = 'Problem getting Operators list';
        if (error.error !== undefined)
          errMsg = errMsg + '. Details: '+error.error;
        this.snackbar.open(errMsg, 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        return Observable.throw(error);
      }
    );
  };

  deleteOperator(row) {
    this.manageHighlightRow(row);
    const operatorType = this.authGuardService.getLoggedInType();
    if (operatorType !== 'ADMIN') {
      this.snackbar.open('This action is for Administrator operators only', 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.authGuardService.getLoggedInUserId() === row._id) {
      this.snackbar.open('You are logged in and are not allowed to delete your definition', 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }

    if (confirm("Delete Operator " + row.name + ' ?')) {
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
          let errMsg = 'Problem deleting Operator';
          if (error.error !== undefined)
            errMsg = errMsg + '. Details: '+error.error;
          this.snackbar.open(errMsg, 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          return Observable.throw(error);
        }
      );
    }
  }

  editOperator(row: OperatorDTO) {
    this.manageHighlightRow(row);
    const dialogConfig = new MatDialogConfig();
    let clonedOperatorDTO = new OperatorDTO(row);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = clonedOperatorDTO;
    dialogConfig.minWidth = 500;
    dialogConfig.minHeight = 650;
    const dialogRef = this.dialog.open(OperatorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      updateOperator => {
        delete updateOperator.title;
        delete updateOperator.password;
        const _id = updateOperator._id;
        delete updateOperator._id;

        updateOperator.name = updateOperator.name.trim();
        updateOperator.phone = updateOperator.phone.trim();
        updateOperator.email = updateOperator.email.trim();
        updateOperator.street = updateOperator.street.trim();
        updateOperator.city = updateOperator.city.trim();
        updateOperator.country = updateOperator.country.trim();
        updateOperator.username = updateOperator.username.trim();
        //updateOperator.notes = updateOperator.notes.trim();

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
            let errMsg = 'Problem updating Operator';
            if (error.error !== undefined)
              errMsg = errMsg + '. Details: '+error.error;
            this.snackbar.open(errMsg, 'Ok', {
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            return Observable.throw(error);
          });
      });
  }

  manageHighlightRow(row) {
    this.highlightedRows.length = 0;
    this.highlightedRows.push(row);
  }

  handleSortAccessor(item, property) {
    try {
    switch (property) {
      case 'name':
        return item.name.toLowerCase();
      case 'type':
        return item.type.toLowerCase();
      case 'phone':
        return item.phone.toLowerCase();
      case 'email':
        return item.email.toLowerCase();
      case 'street':
        return item.street.toLowerCase();
      case 'city':
        return item.city.toLowerCase();
      case 'country':
        return item.country.toLowerCase();
      case 'username':
        return item.username.toLowerCase();
      case 'password':
        return item.password.toLowerCase();
      case 'notes':
        return item.notes.toLowerCase();
      default:
        return item[property];
    }
    }
    catch (e){
        console.log(e);
        return '';

    }
  }
}
