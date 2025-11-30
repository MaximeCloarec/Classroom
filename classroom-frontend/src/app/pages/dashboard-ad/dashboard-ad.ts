import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAllUsers } from '../../services/userService';
import { ChangeDetectorRef } from '@angular/core';
import { deleteUser } from '../../services/userService';



export interface User {
  id_users: number;
  lastname: string;
  firstname: string;
  pseudo: string;
  email: string;
  profile_picture?: string;
  status?: boolean;
}

@Component({
  selector: 'app-dashboard-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-ad.html',
  styleUrls: ['./dashboard-ad.css']
})
export class DashboardAd {

  constructor(private cdr: ChangeDetectorRef) { }
  users: User[] = [];

  async getUser() {
    try {
      this.users = await getAllUsers();
      console.log("users", this.users)
      this.cdr.detectChanges();
    } catch (e: any) {
      console.error("Erreur lors de la récupération des utilisateurs :", e);
    }
  }

  async ngOnInit() {
    await this.getUser();

  }


  selectedIndex: number | null = null;
  toggleDetails(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  async deleteUser(user: User) {
    try {
      const emailSuppressor = localStorage.getItem('adminEmail')
      if (!emailSuppressor) {
        console.log("Email de l'admin introuvé dans localStorage")
        return;
      }
      const emailToDelete = user.email
      await deleteUser(emailSuppressor, emailToDelete);

      // met a jour la liste coté front!
      this.users = this.users.filter(u => u.id_users !== user.id_users)
      console.log("Utilisateur supprimé ! front & back !")

    } catch (err) {
      console.error("Erreur lors de la suppression --> log Front :", err);
    }

  }

  //test
  // users: User[] = [
  //   { id: 1, name: "max", lastname: ' Dupont', img: 'avatar/placeholderAvatar.png', email: 'max@example.com', role: 'Admin' },
  //   { id: 2, name: "gomar", lastname: ' pudont', img: 'avatar/placeholderAvatar.png', email: 'gomar@example.com', role: "stagi" },
  //   { id: 3, name: 'thom ', lastname: ' Donput', img: 'avatar/placeholderAvatar.png', email: 'thom@example.com', role: 'stagi' },
  //   { id: 4, name: 'luc ', lastname: ' Tudonp', img: 'avatar/placeholderAvatar.png', email: "luc@example.com", role: 'stagi' }
  // ]

}
