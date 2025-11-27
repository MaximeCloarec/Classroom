import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { sendUserToBackEnd } from '../../services/user.service';

@Component({
  selector: 'app-inscription',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})

export class Inscription {
  /**
   * Regex for validating passwords:
   * - Minimum 8 characters
   * - At least 1 uppercase letter
   * - At least 1 lowercase letter
   * - At least 1 number
   * - At least 1 special character
   */
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  formData = {
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''

  };

  errors = {
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    password: ''
  };
  resetErrors() {
    this.errors = {
      firstname: '',
      lastname: '',
      pseudo: '',
      email: '',
      password: '',
    };
  }

  validateForm() {
    this.resetErrors()

    if (this.formData.firstname.trim().length < 2) {
      this.errors.firstname = '* Le prenom doit avoir 2 cractere min.';

    }


    if (this.formData.lastname.trim().length < 3) {
      this.errors.lastname = '* Le nom doit avoir 3 cractere min.';

    }


    if (this.formData.pseudo.trim().length < 3) {
      this.errors.pseudo = '* Le pseudo est obligatoire.';

    }


    if (this.formData.email.trim().length <= 0 || !this.formData.email.includes('@')) {
      this.errors.email = '* Email invalide.';

    }


    if (!this.passwordRegex.test(this.formData.password)) {
      this.errors.password = '* Le mot de passe doit contenir 8 caracteres min, 1 maj, 1 min, 1 chiffre et 1 caractère spécial.';
    }
    if (this.formData.password !== this.formData.confirmPassword) {
      this.errors.password = '* Les mots de passe ne correspondent pas.';
    }

    if (this.errors.firstname || this.errors.lastname || this.errors.pseudo || this.errors.email || this.errors.password) {
      return false;
    } else {
      console.log("FORM GG");
    }
    return true;
  }


  async onSubmit() {
    console.log("donné du form:", this.formData)
    if (!this.validateForm()) {

      console.log("erreurs de validation :", this.errors);
      return;
    }


    try {
      //      const response = await sendUserToBackEnd(this.formData);
      //      console.log("reponse backend :", response);
    } catch (e) {
      console.error("!! erreur API !!:", e);
    }

  }

}
