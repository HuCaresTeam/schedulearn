import urljoin from "url-join";
import { Constants } from "./Constants";
import { User } from "./api-contract/User";
import { HttpStatusCode } from "./HttpStatusCode";

class UserContextManager {
  private _user?: User;
  private _hasPinged: boolean = false;

  public get hasPinged(): boolean {
    return this._hasPinged;
  }

  public get user(): User | undefined {
    return this._user;
  }

  public async pingServer(): Promise<HttpStatusCode> {
    const authToken = localStorage.getItem("token");
    if (authToken === null)
      return HttpStatusCode.Unauthorized;

    const response = await this.fetch("api/user/current");

    if (!response.ok) {
      this._user = undefined;
      return response.status;
    }

    this._user = await response.json();
    this._hasPinged = true;

    return response.status;
  };

  public async login(email: string, password: string): Promise<HttpStatusCode> {
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

    if (!response.ok) {
      this._user = undefined;
      return response.status;
    }

    localStorage.setItem("token", `Bearer ${await response.text()}`);
    return await this.pingServer();
  }

  public async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    if (typeof (input) === "string" && !input.includes("http")) {
      input = urljoin(Constants.host, input);
    }

    const authToken = localStorage.getItem("token") || "";
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
    });
  }

  public logout(): void {
    localStorage.setItem("token", "");
    this._user = undefined;
  }
}

export const UserContext = new UserContextManager();
UserContext.pingServer();

export default UserContext;