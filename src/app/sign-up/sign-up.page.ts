import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.page.html',
  styleUrls: ['./login-signup.page.scss'],
})
export class LoginSignupPage implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  isLogin = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      hatedThings: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async login() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
    }
  }

  async signup() {
    const { email, password, confirmPassword, hatedThings, gender, city, state } = this.signupForm.value;
    if (password !== confirmPassword) {
      return console.error('Passwords do not match');
    }
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      firebase.firestore().doc(`users/${user.user?.uid}`).set({
        email,
        hatedThings,
        gender,
        city,
        state,
      });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
    }
  }
}