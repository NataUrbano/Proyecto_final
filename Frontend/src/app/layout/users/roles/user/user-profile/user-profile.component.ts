import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, UsersComponent],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
  })
  export class Users-profileComponent implements OnInit {
    private usersService = inject(UsersService);
  
    readonly users = this.usersService.users;
    readonly loading = this.usersService.loading;
    readonly error = this.usersService.error;
  
    protected readonly roles: UserRole[] = ['ADMIN', 'LIBRARIAN', 'USER'];
    protected readonly statuses: UserStatus[] = ['ACTIVE', 'INACTIVE', 'BLOCKED'];
  
    ngOnInit() {
      this.loadUsers();
    }
  
    async loadUsers() {
      await this.usersService.loadUsers();
    }
  
    onSearch(event: Event) {
      const search = (event.target as HTMLInputElement).value;
      this.usersService.updateFilters({ search });
    }
  
    onRoleFilter(event: Event) {
      const role = (event.target as HTMLSelectElement).value as UserRole;
      this.usersService.updateFilters({ role: role || undefined });
    }
  
    onStatusFilter(event: Event) {
      const status = (event.target as HTMLSelectElement).value as UserStatus;
      this.usersService.updateFilters({ status: status || undefined });
    }
  
    async onStatusUpdate(event: { userId: number; status: UserStatus }) {
      try {
        await this.usersService.updateUserStatus(event.userId, event.status);
      } catch (error) {
        // Manejar error
        console.error('Error updating user status:', error);
      }
    }
  }
  