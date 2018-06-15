import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
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
  rows: SingleDTO[];
  singles: SingleDTO[] = new Array<SingleDTO>();
  dataSource: MatTableDataSource < SingleDTO > = null;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private singlesService: SinglesService,
              private snackbar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getSingles();
  }

  getSingles() {
    this.singlesService.getSingles().subscribe(
      (data: SingleDTO[] )=> {
        this.singles = data;
        this.dataSource = new MatTableDataSource(< SingleDTO[] > this.singles);
        this.sort.active = 'identity.lastName';
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filter ='Jonny';


      },
      error => {
        console.error("Error getting Singles");
        return Observable.throw(error);
      }
    );
  };

  createSingle() {
    alert('Create Single');
  }

  deleteSingle(row) {
    alert('Delete Single');

  }

  editSingle(row: SingleDTO) {
    alert('Edit Single');
  }
}
