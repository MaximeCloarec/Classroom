import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { passwordRegex, emailRegex } from '../../Utils/regex';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule,CommonModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {

  formData = {
    email: '',
    password: ''
  }

  errors = {
    email: '',
    password: ''
  }

  onSubmit() {
    
    this.errors = { email: '', password: '' }

    if (!this.formData.email) {
      this.errors.email = "* L'email requis"
    }else if (!emailRegex.test(this.formData.email)) {
      this.errors.email = "* L'email est invalide";
    }

    if (!this.formData.password) {
      this.errors.password = "* Le mot de passe requis"
    }else if (!passwordRegex.test(this.formData.password)) {
      this.errors.password = "* Mot de passe invalide ";
    }

    if (!this.errors.email && !this.errors.password) {
      console.log("Connexion ok :", this.formData);
    }
  }

}
