import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule  } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})

export class Navbar {
  menuOpen = false;

  constructor(private router: Router) {}

  // Getter pour vérifier si un utilisateur est connecté
  get user() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Méthode de déconnexion
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/connexion']);
  }
}