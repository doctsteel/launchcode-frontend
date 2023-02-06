import axios from "axios";

export default class BaseHttpService {
  BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:3000";

  api = axios.create();
  _accessToken = "";

  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken();
  }
  get(endpoint: string, options = {}) {
    console.log(options);
    Object.assign(options, this._getCommonOptions());
    const res = axios
      .get(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => this._handleHttpError(error));
    return res;
  }

  post(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    const res = axios
      .post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error));
    return res;
  }

  async delete(endpoint: string, options = {}) {
    Object.assign(options, this._getCommonOptions());
    try {
      return await axios.delete(`${this.BASE_URL}/${endpoint}`, options);
    } catch (error) {
      return this._handleHttpError(error);
    }
  }

  async patch(endpoint: string, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    try {
      return await axios.patch(`${this.BASE_URL}/${endpoint}`, data, options);
    } catch (error) {
      return this._handleHttpError(error);
    }
  }

  _handleHttpError(error: any) {
    const { statusCode } = error.response.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      return this._handle401(error);
    }
  }

  _getCommonOptions() {
    const token = this.loadToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  _handle401(error: any) {
    window.location.reload();
    return error;
  }

  saveToken(accessToken: string) {
    this._accessToken = accessToken;
    return localStorage.setItem("accessToken", accessToken);
  }

  loadToken() {
    const token = localStorage.getItem("accessToken") || "";
    this._accessToken = token;
    return token;
  }

  removeToken() {
    localStorage.removeItem("accessToken");
  }
}
