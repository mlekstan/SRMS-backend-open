import { LoginResult } from "../models/LoginResult";

export class LoginResponseDto {
  accessToken: string;

  constructor(data: LoginResult) {
    this.accessToken = data.accessToken;
  }
}