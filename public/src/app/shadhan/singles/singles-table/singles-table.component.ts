import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {SinglesService} from "./singles.service";
import {Observable} from "rxjs/index";
import {SingleDTO} from "./single.data";
import {OperatorDTO} from "../../operators/operators-table/operator.data";
import {OperatorDialogComponent} from "../../operators/operators-table/operator-dialog/operator-dialog.component";
import {SingleDialogComponent} from "./single-dialog/single-dialog.component";

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
        let previousFilter = '';
        let previousActiveSort = 'identity.lastName';
        if (this.dataSource != null){
          if (this.dataSource.filter != null){
            previousFilter = this.dataSource.filter;
          }
          previousActiveSort = this.sort.active;
        }
        this.dataSource = new MatTableDataSource(< SingleDTO[] > this.singles);
        this.sort.active = previousActiveSort;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.dataSource.filter ='Jonny';
        this.dataSource.sortingDataAccessor = (item, property) => {
          return this.handleSortAccessor(item, property);
        };
        if (previousFilter != '') {
          this.onFilterChange(previousFilter);
        }
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
    const dialogConfig = new MatDialogConfig();
    let newSingleDTO = new SingleDTO(null);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = newSingleDTO;
    //dialogConfig.minWidth = 500;
   // dialogConfig.minHeight = 650;

    const dialogRef = this.dialog.open(SingleDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      newSingle => {
        if (newSingle === undefined)
          return;
        console.log("Dialog output:", newSingle);

        this.singlesService.createSingle(newSingle).subscribe(
          data => {
            console.log("Create single succeeded", data);
            this.snackbar.open('Single ' + data.identity.firstName  + ' ' + data.identity.lastName + ' successfully added', null, {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            this.getSingles();
          },
          error => {
            console.error("Error creating Single");
            this.snackbar.open('Problem creating Single', 'Ok', {
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            return Observable.throw(error);
          });
      });
  }

  deleteSingle(row: SingleDTO) {
    if(confirm("Delete Single "+ row.identity.firstName + ' ' + row.identity.lastName +' ?')) {
      this.singlesService.deleteSingle(row._id).subscribe(
        data => {
          this.snackbar.open( row.identity.firstName + ' ' + row.identity.lastName + ' deleted', null, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.getSingles();
        },
        error => {
          console.error("Error deleting Single");
          this.snackbar.open('Problem deleting Single', 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          return Observable.throw(error);
        }
      );
    }

  }

  editSingle(row: SingleDTO) {
    const dialogConfig = new MatDialogConfig();
    let clonedSingleDTO = new SingleDTO(row);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = clonedSingleDTO;
    //dialogConfig.minWidth = 850;
    //dialogConfig.minHeight =600;
    const dialogRef = this.dialog.open(SingleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      updateSingle => {
        if (updateSingle === undefined)
          return;

        console.log("Dialog output:", updateSingle);

        this.singlesService.updateSingle(updateSingle._id, updateSingle).subscribe(
          data => {
            console.log("Update single succeeded", data);
            this.snackbar.open('Single ' + data.identity.firstName + ' ' + data.identity.lastName + ' successfully updated', null, {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            this.getSingles();
          },
          error => {
            console.error("Error updating Single");
            this.snackbar.open('Problem updating Single', 'Ok', {
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
            return Observable.throw(error);
          });
      });
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
