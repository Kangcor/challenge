import { Component } from '@angular/core';

@Component({
  selector: 'wefox-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public menuIsActive = false;

  toggleMenu() {
    this.menuIsActive = !this.menuIsActive;
  }

}
