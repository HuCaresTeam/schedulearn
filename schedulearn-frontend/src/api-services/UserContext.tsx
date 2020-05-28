import urljoin from "url-join";
import { Constants } from "../Constants";
import { HttpStatusCode } from "../HttpStatusCode";
import { BehaviorSubject, Observable } from "rxjs";

export interface AuthUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  limitId?: number; // TODO: Remove this
  token: string;
}

class UserContextManager {
  private userJson = localStorage.getItem("currentUser");
  private currentUser: AuthUser | undefined = this.userJson ? JSON.parse(this.userJson) : undefined;
  private currentUserSubject = new BehaviorSubject(this.currentUser);
  private currentErrorSubject = new BehaviorSubject<string | undefined>(undefined);

  public get error(): string | undefined {
    return this.currentErrorSubject.value;
  }

  public get errorObservable(): Observable<string | undefined> {
    return this.currentErrorSubject.asObservable();
  }

  public setError(error: string | undefined): void {
    this.currentErrorSubject.next(error);
  }

  public get user(): AuthUser | undefined {
    return this.currentUserSubject.value;
  }

  public get userObservable(): Observable<AuthUser | undefined> {
    return this.currentUserSubject.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleResponse = (response: Response): Promise<any> => {
    return response.text().then((textData) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let data: any;
      try {
        data = textData.length > 0 ? JSON.parse(textData) : undefined;
      } catch (er) {
        const errorMessage = "Invalid response from server.";
        this.currentErrorSubject.next(errorMessage);

        return Promise.reject(`${errorMessage}. Invalid json: ${textData}.`);
      }

      if (!response.ok) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].indexOf(response.status) !== -1) {
          this.logout();
        }
        const error = (data && data.error) || response.statusText;
        this.currentErrorSubject.next(error);
        return Promise.reject(error);
      }
      this.currentErrorSubject.next(undefined);
      return data;
    });
  }

  private handleReject = (reason: string): Promise<void> => {
    this.currentErrorSubject.next("It seems our servers are down right now");
    return Promise.reject(reason);
  }

  public async pingServer(): Promise<unknown> {
    return await this.fetch("api/user/current");
  };

  public async login(email: string, password: string): Promise<AuthUser> {
    //password = sha256(password);

    const authEndpoint = urljoin(Constants.host, "api/user/authenticate");
    return await fetch(authEndpoint, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this.handleResponse, this.handleReject)
      .then((user: AuthUser | undefined) => {
        if (!user)
          return Promise.reject("User was undefined");
        
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
    
        return user;
      });
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
    }).then(this.handleResponse, this.handleReject);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchWithoutToken(input: RequestInfo, init?: RequestInit): Promise<any> {
    if (typeof (input) === "string" && !input.includes("http")) {
      input = urljoin(Constants.host, input);
    }

    return fetch(input, init).then(this.handleResponse, this.handleReject);
  }

  public logout(): void {
    localStorage.removeItem("currentUser");

    if (this.user)
      this.currentUserSubject.next(undefined);
  }
}

export const UserContext = new UserContextManager();

export default UserContext;