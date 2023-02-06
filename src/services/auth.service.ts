import BaseHttpService from "./base-http.service";

export default class AuthService extends BaseHttpService {
  async signin(username: string, password: string) {
    const result = await this.post(`auth/login`, {
      username,
      password,
    });

    const accessToken = result.data.accessToken;
    this.saveToken(accessToken);
    return result.data.username;
  }

  async signup(username: string, password: string) {
    await this.post(`auth/register`, { username, password });
  }

  async signout() {
    this.removeToken();
  }
}
