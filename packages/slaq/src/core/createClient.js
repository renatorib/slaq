const fetch = require("node-fetch");

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
    });
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
    });
  };

  const hook = (url, body) => fetcher(url, { body: JSON.stringify(body) });

  return {
    web,
    hook
  };
};
