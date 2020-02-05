import fetch, { Response, BodyInit, HeadersInit } from "node-fetch";
import _debug from "debug";

const debug = _debug("slaq");

const debugErrorMiddleware = (method: string) => (res: Response) => {
  if (res.ok === false) {
    debug(`Method ${method} result in an error`);
    debug(res);
  }
  return res;
};

type FetcherOptions = {
  headers?: HeadersInit;
  body?: BodyInit;
};

export type Client = {
  web: {
    (method: string, body: Object): Promise<Object>;
    form(method: string, body: Object): Promise<Object>;
  };
  hook: (url: string, body: Object) => Promise<Object>;
  fetcher: (url: string, options?: FetcherOptions) => Promise<Object>;
};

export const createClient = ({ token }: { token: string }): Client => {
  const fetcher = async (url: string, options: FetcherOptions = {}) => {
    const res = await fetch(url, {
      method: "POST",
      ...options,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
        ...options.headers
      },
      body: options.body
    });

    try {
      const json = await res.json();
      return json;
    } catch (e) {
      return {};
    }
  };

  const web = (method: string, body: Object) => {
    if (!token)
      throw new Error("Must specify App token config to use slack Web API.");

    return fetcher(`https://slack.com/api/${method}`, {
      body: JSON.stringify(body)
    }).then(debugErrorMiddleware(method));
  };

  const searchParams = (params: Object) =>
    Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

  web.form = (method: string, body: Object) => {
    return fetcher(`https://slack.com/api/${method}`, {
      body: searchParams(body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(debugErrorMiddleware(method));
  };

  const hook = (url: string, body: Object) =>
    fetcher(url, { body: JSON.stringify(body) });

  return {
    web,
    hook,
    fetcher
  };
};
