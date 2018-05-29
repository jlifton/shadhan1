import { Component, OnInit } from '@angular/core';
import {AuthGuardService} from "../../../shadhan/auth/auth.service";

@Component({
  selector: 'fury-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {
  loggedInUser = this.authGuardService.getLoggedInUserName();//'Jonny Lifton';
  isOpen: boolean;

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

}
