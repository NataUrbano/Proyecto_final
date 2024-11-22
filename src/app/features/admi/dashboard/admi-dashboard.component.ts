// features/admin/dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '@core/services/admin.service';

interface Reservation {
  id: number;
  bookTitle: string;
  userName: string;
  userId: number;
  bookId: number;
  reservationDate: Date;
  expectedReturnDate: Date;
  actualReturnDate?: Date;
  status: 'pending' | 'active' | 'completed' | 'canceled';
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  reservations: Reservation[] = [];
  isLoading = true;
  searchTerm = '';
  statusFilter = 'all';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.adminService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const classes = {
      'pending': 'bg-warning text-dark',
      'active': 'bg-success text-white',
      'completed': 'bg-info text-white',
      'canceled': 'bg-danger text-white'
    };
    return classes[status] || '';
  }

  updateReservationStatus(id: number, newStatus: string) {
    this.adminService.updateReservationStatus(id, newStatus).subscribe({
      next: () => this.loadReservations()
    });
  }

  get filteredReservations() {
    return this.reservations.filter(res => {
      const matchesSearch = 
        res.bookTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        res.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || res.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
}
