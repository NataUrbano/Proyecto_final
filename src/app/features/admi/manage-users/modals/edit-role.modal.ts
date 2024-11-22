import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    template: `
      <div class="modal-header">
        <h4 class="modal-title">{{ 'admin.users.edit_role_modal.title' | translate }}</h4>
        <button class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <p>{{ 'admin.users.edit_role_modal.current_role' | translate }}: 
          <strong>{{ user.role }}</strong>
        </p>
        <select class="form-select" [(ngModel)]="selectedRole">
          <option value="USER">{{ 'admin.users.role.user' | translate }}</option>
          <option value="ADMIN">{{ 'admin.users.role.admin' | translate }}</option>
        </select>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" (click)="modal.dismiss()">
          {{ 'admin.users.edit_role_modal.cancel' | translate }}
        </button>
        <button class="btn btn-primary" (click)="modal.close(selectedRole)">
          {{ 'admin.users.edit_role_modal.save' | translate }}
        </button>
      </div>
    `
  })
  export class EditRoleModalComponent implements OnInit {
    @Input() user: any;
    selectedRole: string;
  
    constructor(public modal: NgbModal) {}
  
    ngOnInit() {
      this.selectedRole = this.user.role;
    }
  }