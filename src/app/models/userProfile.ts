export interface UserProfile {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female';
    preferredGender: 'male' | 'female';
    likedUsers: string[];
    dislikedUsers: string[];
  }