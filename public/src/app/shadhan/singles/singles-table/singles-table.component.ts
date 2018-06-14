import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from "@angular/material";
import {SinglesService} from "./singles.service";
import {Observable} from "rxjs/index";
import {SingleDTO} from "./single.data";
import {OperatorDTO} from "../../operators/operators-table/operator.data";

@Component({
  selector: 'fury-singles-table',
  templateUrl: './singles-table.component.html',
  styleUrls: ['./singles-table.component.scss']
})
export class SinglesTableComponent implements OnInit {

  constructor(private singlesService: SinglesService,
              private snackbar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getSingles();
  }

  getSingles() {
    this.singlesService.getSingles().subscribe(
      (data: SingleDTO[] )=> {
        const x = 0;
        /**
        this.operators = data;
        this.dataSource = new MatTableDataSource(< OperatorDTO[] > this.operators);
        this.sort.active = 'name';
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter ='Jonny';
        **/
      },
      error => {
        console.error("Error getting Singles");
        return Observable.throw(error);
      }
    );
  };

}
