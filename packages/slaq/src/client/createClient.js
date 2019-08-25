const fetch = require("node-fetch");
const debug = require("debug")("slaq");

const debugErrorMiddleware = method => res => {
  if (res.ok === false) {
    debug(`Method ${method} result in an error`);
    debug(res);
  }
  return res;
};

module.exports = ({ token }) => {
  const fetcher = async (url, options = {}) => {
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

  const web = (method, body) => {
    if (!token)
      throw new Error("Must specify App token config to use slack Web API.");

    return fetcher(`https://slack.com/api/${method}`, {
      body: JSON.stringify(body)
    }).then(debugErrorMiddleware(method));
  };

  const searchParams = params =>
    Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

  web.form = (method, body) => {
    return fetcher(`https://slack.com/api/${method}`, {
      body: searchParams(body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(debugErrorMiddleware(method));
  };

  const hook = (url, body) => fetcher(url, { body: JSON.stringify(body) });

  return {
    web,
    hook,
    fetcher
  };
};
