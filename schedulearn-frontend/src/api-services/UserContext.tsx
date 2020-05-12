import urljoin from "url-join";
import { Constants } from "../Constants";
import { HttpStatusCode } from "../HttpStatusCode";
import { BehaviorSubject, Observable } from "rxjs";

export interface AuthUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  token: string;
}

class UserContextManager {
  private userJson = localStorage.getItem("currentUser");
  private currentUser: AuthUser | undefined = this.userJson ? JSON.parse(this.userJson) : undefined;
  private currentUserSubject = new BehaviorSubject(this.currentUser);

  public get user(): AuthUser | undefined {
    return this.currentUserSubject.value;
  }

  public get userObservable(): Observable<AuthUser | undefined> {
    return this.currentUserSubject.asObservable();
  }

  private async handleResponse(response: Response): Promise<unknown> {
    return response.json().then((data) => {
      if (!response.ok) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].indexOf(response.status) !== -1) {
          this.logout();
          location.reload(true);
        }

        // Set error

        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }

  public async pingServer(): Promise<unknown> {
    return await this.fetch("api/user/current");
  };

  public async login(email: string, password: string): Promise<AuthUser> {
    //password = sha256(password);

    const authEndpoint = urljoin(Constants.host, "api/user/authenticate");
    const response = await fetch(authEndpoint, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const user = (await this.handleResponse(response)) as AuthUser;

    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUserSubject.next(user);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetch(input: RequestInfo, init?: RequestInit): Promise<any> {
    if (!this.user || !this.user.token) {
      //Set Error
      return Promise.reject("User is not logged in");
    }

    if (typeof (input) === "string" && !input.includes("http")) {
      input = urljoin(Constants.host, input);
    }

    const authToken = `Bearer ${this.user.token}`;
    if (init === undefined)
      init = { headers: { "Authorization": authToken } };

    if (init.headers === undefined)
      init.headers = { "Authorization": authToken };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { headers, ...newInit } = { ...init };
    const newHeaders = { ...init.headers, "Authorization": authToken };

    return fetch(input, {
      ...newInit,
      headers: newHeaders,
    }).then(this.handleResponse);
  }

  public logout(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(undefined);
  }
}

export const UserContext = new UserContextManager();

export default UserContext;