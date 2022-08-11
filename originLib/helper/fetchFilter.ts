export const originalFetch = window.fetch;

const DEFAULT_SERVER_API = "http://localhost:8181";

export function fetchFilter() {
  window.fetch = function (arg1: any, arg2: any) {
    let url = arg1.toString() as string;

    const args = customizeHeader(arguments);
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      const targetUrl = DEFAULT_SERVER_API + url;
      console.log("Replace url from:", args[0], "to:", targetUrl);
      args[0] = targetUrl;
    }

    return originalFetch
      .apply(this, args)
      .then((res: Response) => validateResponseStatus(res))
      .catch((err: any) => {
        if (err && err.message.indexOf("Unexpected error") === 0) {
          console.log("500 etc Unexpected error catch from filter!");
        }
      }) as any;
  };

  function customizeHeader(args: IArguments): [RequestInfo, RequestInit] {
    let input: RequestInfo, option: RequestInit;
    [input, option] = args;
    const customizedHeaders =
      option && option.headers ? new Headers(option.headers) : new Headers();

    // Set 'Content-Type' 'application/json' as default
    setHeaderIfNotGiven(customizedHeaders, "Content-Type", "application/json");
    // setHeaderIfNotGiven(customizedHeaders, "Authorization", tokenBearer());

    option.headers = customizedHeaders;

    // Set method = GET as default
    option.method = option.method ? option.method : "GET";

    return [input, option];
  }

  function setHeaderIfNotGiven(headers: Headers, name: string, value: string) {
    if (!headers.get(name)) {
      headers.set(name, value);
    } else {
      console.log(`Used customized ${name}: ${headers.get(name)}`);
    }
  }

  function validateResponseStatus(response: Response): Response {
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // auto logout if 401 response returned from api
        // StorageUtil.clear();
        // loginService.logout();
        // location.reload(true);
        return new Response("{}");
        // throw new Error("Invalid token");
      }
      throw new Error("Unexpected error: " + response.status);
    }
    return response;
  }
}
