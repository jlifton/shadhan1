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
  pageSize = 7;

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
        this.dataSource.sortingDataAccessor = (item, property) => {
          return this.handleSortAccessor(item, property);
        };
      },
      error => {
        console.error("Error getting Singles");
        return Observable.throw(error);
      }
    );
  };

  handleSortAccessor(item, property) {
    switch(property) {
      case 'identity.firstName': return item.identity.firstName;
      case 'identity.lastName': return item.identity.lastName;
      case 'identity.sex': return item.identity.sex;
      case 'identity.age': return item.identity.age;
      case 'identity.maritalStatus': return item.identity.maritalStatus;

      case 'religioEthnic.hashkafa': return item.religioEthnic.hashkafa;
      case 'religioEthnic.ethnicityAdditional': return item.religioEthnic.ethnicityAdditional;
      case 'religioEthnic.ethnicity': return item.religioEthnic.ethnicity;
      case 'religioEthnic.convert': return item.religioEthnic.convert;
      case 'religioEthnic.cohen': return item.religioEthnic.cohen;
      case 'religioEthnic.primaryActivity': return item.religioEthnic.primaryActivity;

      case 'residence.city': return item.residence.city;
      case 'residence.country': return item.residence.country;

      case 'physical.smoker': return item.physical.smoker;
      case 'physical.height': return item.physical.height;
      case 'physical.build': return item.physical.build;
      case 'physical.description': return item.physical.description;

      case 'contact.name': return item.contact.name;
      case 'contact.relationship': return item.contact.relationship;
      case 'contact.primaryPhone': return item.contact.primaryPhone;
      case 'contact.secondaryPhone': return item.contact.secondaryPhone;
      case 'contact.email': return item.contact.email;

      case 'source.name': return item.source.name;
      case 'source.email': return item.source.email;
      case 'source.phone': return item.source.phone;

      case 'occupation': return item.occupation;
      case 'specialNeeds': return item.specialNeeds;
      case 'personalityRequirements': return item.personalityRequirements;
      case 'pastEducation': return item.pastEducation;
      case 'dateEntered': return item.dateEntered;

      default: return item[property];
    }
  }

  createSingle() {
    alert('Create Single');
  }

  deleteSingle(row) {
    alert('Delete Single');

  }

  editSingle(row: SingleDTO) {
    alert('Edit Single');
  }


  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filterPredicate =
      (data: SingleDTO, filter: string) => {
        if (data.identity.firstName.indexOf(filter) != -1)
          return true;
        if (data.identity.lastName.indexOf(filter) != -1)
          return true;
        if (data.identity.sex.indexOf(filter) != -1)
          return true;
        if (data.identity.maritalStatus.indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.hashkafa.indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.ethnicity.indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.ethnicityAdditional.indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.primaryActivity.indexOf(filter) != -1)
          return true;
        if (data.residence.city.indexOf(filter) != -1)
          return true;
        if (data.residence.country.indexOf(filter) != -1)
          return true;
        if (data.physical.build.indexOf(filter) != -1)
          return true;
        if (data.physical.description.indexOf(filter) != -1)
          return true;
        if (data.contact.name.indexOf(filter) != -1)
          return true;
        if (data.contact.relationship.indexOf(filter) != -1)
          return true;
        if (data.contact.primaryPhone.indexOf(filter) != -1)
          return true;
        if (data.contact.secondaryPhone.indexOf(filter) != -1)
          return true;
        if (data.contact.email.indexOf(filter) != -1)
          return true;
        if (data.source.name.indexOf(filter) != -1)
          return true;
        if (data.source.email.indexOf(filter) != -1)
          return true;
        if (data.source.phone.indexOf(filter) != -1)
          return true;

        if (data.occupation.indexOf(filter) != -1)
          return true;
        if (data.specialNeeds.indexOf(filter) != -1)
          return true;
        if (data.personalityRequirements.indexOf(filter) != -1)
          return true;
        if (data.pastEducation.indexOf(filter) != -1)
          return true;

        return false; //data.name.indexOf(filter) != -1;
      }
    //value = value.trim();
   //value = value.toLowerCase();
    this.dataSource.filter = value;
  }
}
