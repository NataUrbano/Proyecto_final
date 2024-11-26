import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { User, UserFilters, UserStatus } from "./user.interface";

Injectable({
    providedIn: 'root'
  })
  export class UsersService {
    private http = inject(HttpClient);
    private apiUrl = 'api/users';
  
    // State
    private usersState = signal<User[]>([]);
    private loadingState = signal(false);
    private errorState = signal<string | null>(null);
    private filtersState = signal<UserFilters>({});
  
    // Computed values
    readonly users = computed(() => {
      const filters = this.filtersState();
      let filteredUsers = this.usersState();
      
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.name.toLowerCase().includes(search) || 
          user.email.toLowerCase().includes(search)
        );
      }
      
      if (filters.role) {
        filteredUsers = filteredUsers.filter(user => user.role === filters.role);
      }
      
      if (filters.status) {
        filteredUsers = filteredUsers.filter(user => user.status === filters.status);
      }
      
      return filteredUsers;
    });
  
    readonly loading = computed(() => this.loadingState());
    readonly error = computed(() => this.errorState());
    readonly filters = computed(() => this.filtersState());
  
    async loadUsers(): Promise<void> {
      try {
        this.loadingState.set(true);
        this.errorState.set(null);
        
        const users = await this.http.get<User[]>(this.apiUrl).toPromise();
        this.usersState.set(users || []);
      } catch (error) {
        this.errorState.set('Error al cargar usuarios');
        console.error('Error loading users:', error);
      } finally {
        this.loadingState.set(false);
      }
    }
  
    async updateUserStatus(userId: number, status: UserStatus): Promise<void> {
      try {
        await this.http.patch(`${this.apiUrl}/${userId}/status`, { status }).toPromise();
        
        this.usersState.update(users => 
          users.map(user => 
            user.id === userId ? { ...user, status } : user
          )
        );
      } catch (error) {
        console.error('Error updating user status:', error);
        throw new Error('Error al actualizar el estado del usuario');
      }
    }
  
    setFilters(filters: UserFilters): void {
      this.filtersState.set(filters);
    }
  
    updateFilters(filters: Partial<UserFilters>): void {
      this.filtersState.update(current => ({ ...current, ...filters }));
    }
  }
  