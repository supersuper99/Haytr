import { Component, OnInit } from '@angular/core';
import { User

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // currentUser: UserProfile;
  // matches: UserProfile[];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('userProfiles').doc(this.currentUser.id).valueChanges()
      .subscribe(userProfile => {
        this.currentUser = userProfile;
        this.getMatches();
      });
  }

  getMatches() {
    this.firestore.collection('userProfiles', ref => ref.where('preferredGender', '==', this.currentUser.gender)).valueChanges()
      .subscribe(snapshot => {
        this.matches = snapshot.docs.map(doc => doc.data() as UserProfile);
      });
  }

  async like(match: UserProfile) {
    this.currentUser.likedUsers.push(match.id);
    await this.firestore.collection('userProfiles').doc(this.currentUser.id).update(this.currentUser);
  }

  async dislike(match: UserProfile) {
    this.currentUser.dislikedUsers.push(match.id);
    await this.firestore.collection('userProfiles').doc(this.currentUser.id).update(this.currentUser);
  }
}