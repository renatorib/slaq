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
          : undefined,
      user: body.event.user
    };
  }

  if (body.command !== undefined) {
    return {
      type: "command",
      channel: body.channel_id,
      user: body.user_id
    };
  }

  if (
    body.name !== undefined ||
    body.type === "block_suggestion" ||
    body.type === "dialog_suggestion"
  ) {
    return {
      type: "options",
      channel: body.channel.id,
      user: body.user.id
    };
  }

  if (
    body.actions !== undefined ||
    body.type === "dialog_submission" ||
    body.type === "message_action"
  ) {
    return {
      type: "action",
      channel: body.channel.id,
      user: body.user.id
    };
  }

  return {};
};

module.exports = infer;
