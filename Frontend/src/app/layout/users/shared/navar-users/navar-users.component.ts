import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar-users.component.html',
    styleUrls: ['./navbar-users.component.scss']
  })

  export class NavbarComponent {
    isSearchOpen = false;
    isSidebarOpen = false;
    
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    }
  
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }