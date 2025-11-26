import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { getAllUsers } from '../../services/user.service';

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  img?: string;
  role: string
}

@Component({
  selector: 'app-dashboard-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-ad.html',
  styleUrls: ['./dashboard-ad.css']
})
export class DashboardAd {

  // users: User[] = [];

  // async getUser() {
  //   this.users = await getAllUsers();

  // }
  
  // async ngOnInit() {
  //   await this.loadUsers();
  // }

  // async loadUsers() {
  //   this.users = await getAllUsers();
  // }
  selectedIndex: number | null = null;
  toggleDetails(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

  //test
  users: User[] = [
    { id: 1, name: "max", lastname: ' Dupont',img:'avatar/placeholderAvatar.png', email: 'max@example.com', role: 'Admin' },
    { id: 2, name: "gomar", lastname: ' pudont',img:'avatar/placeholderAvatar.png', email: 'gomar@example.com', role: "stagi" },
    { id: 3, name: 'thom ', lastname: ' Donput',img:'avatar/placeholderAvatar.png', email: 'thom@example.com', role: 'stagi' },
    { id: 4, name: 'luc ', lastname: ' Tudonp',img:'avatar/placeholderAvatar.png', email: "luc@example.com", role: 'stagi' }
  ]

}
