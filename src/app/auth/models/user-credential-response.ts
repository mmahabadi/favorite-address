import {User} from "./user";

export interface UserCredentialResponse{
  accessToken: string;
  user: User
}
