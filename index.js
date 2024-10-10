import axios from "axios";
import {
  Client
} from "xaoai-utils";

const client = new Client( {
  prefix: process.env.PREFIX,
  ignoreMessageInCommandEvent: true
});

client.openServer(process.env.PORT);
client.loginWithAppState(process.env.APPSTATE);
client.on('ready', (_, bid) => console.log("Logged in as", bid, `[${process.env.PREFIX}]`));

client.on('command', async (command) => {
  if (command.name === "ai") {
    try {
      let query = command.commandArgs.join("");
      const output = await xaoai.xviii(query);
      command.message.reply(output);
    } catch (e) {
      console.error(e.response.data);
      command.message.reply("Error, please try again.");
    }
  }

  if (command.name === "lyrics") {
    try {
      let query = command.commandArgs.join("");
      const output = await xaoai.lyrics(query);
      command.message.reply(output);
    } catch (e) {
      console.error(e.response.data);
      command.message.reply("Error, please try again.");
    }
  }
});

client.on('error', (e) => {
  console.error("login error");
  console.error(e);
});