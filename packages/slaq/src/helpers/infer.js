// Infer metadata like type and channel based on parsed requests

const infer = req => {
  const body = req.body || {};

  if (body.event !== undefined) {
    return {
      type: "event",
      channel:
        body.event.channel !== undefined
          ? body.event.channel
          : body.event.item !== undefined
          ? body.event.item.channel
          : undefined
    };
  }

  if (body.command !== undefined) {
    return {
      type: "command",
      channel: body.channel_id
    };
  }

  if (body.name !== undefined || body.type === "block_suggestion") {
    return {
      type: "options",
      channel: body.channel.id
    };
  }

  if (
    body.actions !== undefined ||
    body.type === "dialog_submission" ||
    body.type === "message_action"
  ) {
    return {
      type: "action",
      channel: body.channel.id
    };
  }

  return {};
};

module.exports = infer;
