// modules/user/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@core/services/user.service';
import { ReservationService } from '@core/services/reservation.service';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  epilogoId: string;
}

interface Reservation {
  id: string;
  bookTitle: string;
  bookCover: string;
  reservationDate: Date;
  pickupDate: Date;
  status: 'pending' | 'active' | 'completed' | 'canceled';
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile?: UserProfile;
  reservations: Reservation[] = [];
  profileForm: FormGroup;
  isEditing = false;
  currentLanguage: string;
  availableLanguages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private reservationService: ReservationService,
    private translateService: TranslateService
  ) {
    this.currentLanguage = this.translateService.currentLang;
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
    this.loadReservations();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe(user => {
      this.userProfile = user;
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    });
  }

  loadReservations() {
    this.reservationService.getUserReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: (updatedUser) => {
          this.userProfile = updatedUser;
          this.isEditing = false;
        }
      });
    }
  }

  changeLanguage(langCode: string) {
    this.translateService.use(langCode);
    this.currentLanguage = langCode;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'active': return 'text-primary';
      case 'completed': return 'text-success';
      case 'canceled': return 'text-danger';
      default: return '';
    }
  }
}