export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string | undefined;
  gender: string;
  hobbies: string;
  occupation: string;
  createdAt?: string;
}
