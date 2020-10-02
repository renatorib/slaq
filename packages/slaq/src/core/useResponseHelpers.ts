import _debug from "debug";
import { infer } from "../helpers/infer";
import { Module } from "../index";

type Message = string | object;

declare global {
  namespace Express {
    interface Response {
      say: (message: Message) => Promise<any>;
      pm: (message: Message) => Promise<any>;
      whisper: (message: Message) => Promise<any>;
      ack: (message: Message) => void;
      respond: (message: Message) => Promise<any> | void;
    }
  }
}

const debug = _debug("slaq");

export const useResponseHelpers: Module = app => {
  app.use((req, res, next) => {
    const { channel, user } = infer(req);

    const say: Express.Response["say"] = message => {
      return app.client.web("chat.postMessage", {
        channel,
        ...(typeof message === "string" ? { text: message } : { ...message })
      });
    };

    const pm: Express.Response["pm"] = message => {
      return app.client.web("chat.postMessage", {
        channel: user,
        ...(typeof message === "string" ? { text: message } : { ...message })
      });
    };

    const whisper: Express.Response["whisper"] = message => {
      return app.client.web("chat.postEphemeral", {
        channel,
        user,
        ...(typeof message === "string" ? { text: message } : { ...message })
      });
    };

    const ack: Express.Response["ack"] = message => {
      res.status(200).send(message);
    };

    const respond: Express.Response["respond"] = message => {
      if (req.body.response_url) {
        return app.client.hook(req.body.response_url, {
          ...(typeof message === "string" ? { text: message } : { ...message })
        });
      } else {
        debug("You can only 'respond' to a request with 'response_url'");
      }
    };

    res.say = say;
    res.pm = pm;
    res.whisper = whisper;
    res.ack = ack;
    res.respond = respond;

    next();
  });
};
