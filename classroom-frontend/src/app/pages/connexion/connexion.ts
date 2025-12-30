import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { loginUser } from '../../services/userService';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css'],
})
export class Connexion {
  formData = { email: '', password: '' };
  errors: any = {};
  loading = false;

  // Injection du Router via le constructeur
  constructor(private router: Router) {}

  async onSubmit() {
    this.errors = {};

    // Validation front
    if (!this.formData.email) this.errors.email = "L'email est requis";
    if (!this.formData.password) this.errors.password = "Le mot de passe est requis";

    if (Object.keys(this.errors).length > 0) return;

    this.loading = true;

    try {
      const user = await loginUser(this.formData);
      console.log('Utilisateur connecté :', user);

      // Stockage dans localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirection après connexion
      this.router.navigate(['/home']); // ← ici on utilise Router
    } catch (err: any) {
      console.error(err);
      this.errors.general = err.message || 'Erreur de connexion';
    } finally {
      this.loading = false;
    }
  }
}
