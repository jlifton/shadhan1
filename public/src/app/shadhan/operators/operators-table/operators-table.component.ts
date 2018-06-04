import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Customer} from "../../../demo/tables/all-in-one-table/customer-create-update/customer.model";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";
import {Observable} from "rxjs";
import {LoginService} from "../../login/login.service";
import {OperatorsService} from "./operators.service";
import {OperatorDTO} from "./operator.data";

@Component({
  selector: 'fury-operators-table',
  templateUrl: './operators-table.component.html',
  styleUrls: ['./operators-table.component.scss']
})
export class OperatorsTableComponent implements OnInit {
  rows: any[];
  operators: OperatorDTO[] = new Array<OperatorDTO>();

  //dataSource = new ExampleDataSource();
  dataSource = new OperatorsDataSource();

  constructor(private operatorsService: OperatorsService) {

  }

  ngOnInit() {
    //this.dataSource = new MatTableDataSource();
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
}


export interface SampleElement {
  username: string;
  age: string
  title: string;
}

const SAMPLE_DATA: SampleElement[] = [

  {
    'username': 'jonny',
    'age': '60',
    'title': 'CEO'
  },
  {
    'username': 'shlomo',
    'age': '55',
    'title': 'deputy CEO'
  },
  {
    'username': 'george',
    'age': '50',
    'title': 'RandD Head'
  }
];


export class ExampleDataSource extends DataSource<SampleElement> {
  /** Stream of data that is provided to the table. */
  data: BehaviorSubject<SampleElement[]> = new BehaviorSubject<SampleElement[]>(SAMPLE_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SampleElement[]> {
    return this.data;
  }

  disconnect() {
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

