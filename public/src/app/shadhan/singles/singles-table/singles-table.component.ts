import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatSortable,
  MatTableDataSource, PageEvent
} from "@angular/material";
import {SinglesService} from "./singles.service";
import {Observable} from "rxjs/index";
import {SingleDTO} from "./single.data";
import {OperatorDTO} from "../../operators/operators-table/operator.data";
import {OperatorDialogComponent} from "../../operators/operators-table/operator-dialog/operator-dialog.component";
import {SingleDialogComponent} from "./single-dialog/single-dialog.component";
import {ListColumn} from "../../../core/common/list/list-column.model";
import {AuthGuardService} from "../../auth/auth.service";

@Component({
  selector: 'fury-singles-table',
  templateUrl: './singles-table.component.html',
  styleUrls: ['./singles-table.component.scss']
})
export class SinglesTableComponent implements OnInit {
  rows: SingleDTO[];
  singles: SingleDTO[] = new Array<SingleDTO>();
  dataSource: MatTableDataSource < SingleDTO > = null;
  pageSize = 5;

  @Input()
  columns: ListColumn[] = [
    { name: 'First Name', property: 'identity.firstName', visible: true},
    { name: 'Last Name', property: 'identity.lastName', visible: true },
    { name: 'Sex', property: 'identity.sex', visible: true },
    { name: 'Age', property: 'identity.age', visible: true },
    { name: 'Marital Status', property: 'identity.maritalStatus', visible: true },
    { name: 'Hashkafa', property: 'religioEthnic.hashkafa', visible: true},
    { name: 'Ethnicity', property: 'religioEthnic.ethnicity', visible: true },
    { name: 'Ethnicity Addl', property: 'religioEthnic.ethnicityAdditional', visible: false },
    { name: 'Convert', property: 'religioEthnic.convert', visible: false },
    { name: 'Cohen', property: 'religioEthnic.cohen', visible: false },
    { name: 'Primary Activity', property: 'religioEthnic.primaryActivity', visible: true },
    { name: 'City Residence', property: 'residence.city', visible: false },
    { name: 'Country Residence', property: 'residence.country', visible: false },
    { name: 'Smoker', property: 'physical.smoker', visible: false },
    { name: 'Height', property: 'physical.height', visible: false },
    { name: 'Build', property: 'physical.build', visible: false },
    { name: 'Phys Description', property: 'physical.description', visible: false },
    { name: 'Contact Name', property: 'contact.name', visible: true },
    { name: 'Contact Relationship', property: 'contact.relationship', visible: false },
    { name: 'Contact Primary Phone', property: 'contact.primaryPhone', visible: false },
    { name: 'Contact Secondary Phone', property: 'contact.secondaryPhone', visible: false },
    { name: 'Contact Email', property: 'contact.email', visible: false },
    { name: 'Source Name', property: 'source.name', visible: false },
    { name: 'Source Email', property: 'source.email', visible: false },
    { name: 'Source Phone', property: 'source.phone', visible: false },
    { name: 'Occupation', property: 'occupation', visible: true },
    { name: 'Special Needs', property: 'specialNeeds', visible: false },
    { name: 'Personailty Requirements', property: 'personalityRequirements', visible: false },
    { name: 'Past Education', property: 'pastEducation', visible: false },
    { name: 'Comments', property: 'comments', visible: true },
    { name: 'Created', property: 'created', visible: false },
    { name: 'Updated', property: 'updated', visible: false },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  defaultSort: MatSortable = {
    id: 'identity.lastName',
    start: 'asc',
    disableClear: true
  };

  constructor(private singlesService: SinglesService,
              private authGuardService: AuthGuardService,
              private snackbar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.initCachedPageSize();
    this.getSingles(true);
  }

  initCachedPageSize(){
    //this.paginator.showFirstLastButtons(true);
    const singlesPageSize = localStorage.getItem('singlesPageSize');
    if (singlesPageSize !== null)
      this.pageSize = Number(singlesPageSize);
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getSingles(defaultSort) {
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

        this.dataSource.sort = this.sort;
        this.sort.active = previousActiveSort;

        this.dataSource.paginator = this.paginator;
        //this.dataSource.filter ='Jonny';
        this.dataSource.sortingDataAccessor = (item, property) => {
          return this.handleSortAccessor(item, property);
        };
        if (previousFilter != '') {
          this.onFilterChange(previousFilter);
        }
        if (defaultSort) {
          this.sort.sort(this.defaultSort);
          this.sort.direction = 'asc';
          this.sort.sort(this.defaultSort);
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
    dialogConfig.disableClose = true;
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
            this.getSingles(false);
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
    const operatorType = this.authGuardService.getLoggedInType();
    if (operatorType !== 'ADMIN' && operatorType !== 'DATAENTRY'){
      this.snackbar.open('This action is for Administrator and Data Entry operators only', 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if(confirm("Delete Single "+ row.identity.firstName + ' ' + row.identity.lastName +' ?')) {
      this.singlesService.deleteSingle(row._id).subscribe(
        data => {
          this.snackbar.open( row.identity.firstName + ' ' + row.identity.lastName + ' deleted', null, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
          this.getSingles(false);
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
            this.getSingles(false);
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
        filter = filter.toLowerCase();
        if (data.identity.firstName.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.identity.lastName.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.identity.age.toString().indexOf(filter) != -1)
          return true;
        if (data.identity.sex.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.identity.maritalStatus.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.hashkafa.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.ethnicity.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.ethnicityAdditional.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.religioEthnic.primaryActivity.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.residence.city.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.residence.country.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.physical.build.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.physical.description.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.contact.name.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.contact.relationship.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.contact.primaryPhone.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.contact.secondaryPhone.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.contact.email.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.source.name.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.source.email.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.source.phone.toLowerCase().indexOf(filter) != -1)
          return true;

        if (data.occupation.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.specialNeeds.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.personalityRequirements.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.pastEducation.toLowerCase().indexOf(filter) != -1)
          return true;
        if (data.comments.toLowerCase().indexOf(filter) != -1)
          return true;
        if (this.toDateString(data.created).indexOf(filter) != -1)
          return true;
        if (this.toDateString(data.updated).indexOf(filter) != -1)
          return true;
        return false; //data.name.indexOf(filter) != -1;
      }
    this.dataSource.filter = value;
  }

  toDateString(date) {
    let d: Date;
    if  (date === undefined)
      return 'n/a';
    d = new Date(date);
    var datestring = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
      d.getFullYear();
    return datestring;
  }

  public pageEventHandler(event?:PageEvent){
    if (event.pageSize !== null){
      if (event.pageSize != this.pageSize) {
        this.pageSize = event.pageSize;
        localStorage.setItem('singlesPageSize', ''+ event.pageSize);
        console.log('changed singlesPageSize:'+ event.pageSize);
      }
    }
  }

}
