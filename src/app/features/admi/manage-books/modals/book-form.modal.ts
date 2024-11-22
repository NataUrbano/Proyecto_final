import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    template: `
      <div class="modal-header">
        <h4 class="modal-title">
          {{ (book ? 'admin.books.edit' : 'admin.books.add') | translate }}
        </h4>
        <button class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <form [formGroup]="bookForm" class="book-form">
          <div class="row g-3">
            <!-- Title -->
            <div class="col-12">
              <label class="form-label">{{ 'admin.books.form.title' | translate }}</label>
              <input type="text" class="form-control" formControlName="title">
            </div>
  
            <!-- Author -->
            <div class="col-12">
              <label class="form-label">{{ 'admin.books.form.author' | translate }}</label>
              <input type="text" class="form-control" formControlName="author">
            </div>
  
            <!-- Cover URL -->
            <div class="col-12">
              <label class="form-label">{{ 'admin.books.form.cover' | translate }}</label>
              <input type="url" class="form-control" formControlName="coverUrl">
            </div>
  
            <!-- Category -->
            <div class="col-md-6">
              <label class="form-label">{{ 'admin.books.form.category' | translate }}</label>
              <select class="form-select" formControlName="categoryId">
                <option *ngFor="let cat of categories" [value]="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
  
            <!-- Total Copies -->
            <div class="col-md-6">
              <label class="form-label">{{ 'admin.books.form.copies' | translate }}</label>
              <input type="number" class="form-control" formControlName="totalCopies">
            </div>
  
            <!-- Description -->
            <div class="col-12">
              <label class="form-label">{{ 'admin.books.form.description' | translate }}</label>
              <textarea class="form-control" rows="4" formControlName="description"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" (click)="modal.dismiss()">
          {{ 'admin.books.form.cancel' | translate }}
        </button>
        <button class="btn btn-primary" (click)="saveBook()" [disabled]="!bookForm.valid">
          {{ 'admin.books.form.save' | translate }}
        </button>
      </div>
    `
  })
  export class BookFormModalComponent implements OnInit {
    @Input() book: any;
    bookForm: FormGroup;
  
    constructor(
      public modal: NgbModal,
      private fb: FormBuilder
    ) {
      this.bookForm = this.fb.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        coverUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
        categoryId: ['', Validators.required],
        totalCopies: [1, [Validators.required, Validators.min(1)]],
        description: ['', Validators.required]
      });
    }
  
    ngOnInit() {
      if (this.book) {
        this.bookForm.patchValue(this.book);
      }
    }
  
    saveBook() {
      if (this.bookForm.valid) {
        this.modal.close(this.bookForm.value);
      }
    }
  }