// features/admin/pages/manage-users/manage-users.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '@core/services/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditRoleModalComponent } from './modals/edit-role.modal';

interface User {
 id: number;
 firstName: string;
 lastName: string;
 email: string;
 role: 'USER' | 'ADMIN';
 registrationDate: Date;
 status: 'active' | 'inactive';
}

@Component({
 selector: 'app-manage-users',
 templateUrl: './manage-users.component.html',
 styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
 users: User[] = [];
 isLoading = true;
 searchTerm = '';
 roleFilter = 'all';
 statusFilter = 'all';

 constructor(
   private adminService: AdminService,
   private modalService: NgbModal
 ) {}

 ngOnInit() {
   this.loadUsers();
 }

 loadUsers() {
   this.adminService.getUsers().subscribe({
     next: (users) => {
       this.users = users;
       this.isLoading = false;
     },
     error: () => this.isLoading = false
   });
 }

 get filteredUsers() {
   return this.users.filter(user => {
     const matchesSearch = 
       user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
     const matchesRole = this.roleFilter === 'all' || user.role === this.roleFilter;
     const matchesStatus = this.statusFilter === 'all' || user.status === this.statusFilter;
     return matchesSearch && matchesRole && matchesStatus;
   });
 }

 async editUserRole(user: User) {
   const modalRef = this.modalService.open(EditRoleModalComponent, {
     centered: true,
     backdrop: 'static'
   });
   modalRef.componentInstance.user = user;

   try {
     const result = await modalRef.result;
     if (result) {
       this.adminService.updateUserRole(user.id, result).subscribe({
         next: () => this.loadUsers()
       });
     }
   } catch (error) {
     console.error('Error updating user role:', error);
   }
 }

 getRoleBadgeClass(role: string): string {
   return role === 'ADMIN' ? 'bg-primary' : 'bg-secondary';
 }
}