import axios from "axios";
import {
  Chatbox
} from "xaoai-utils";

const chatbox = new Chatbox( {
  prefix: process.env.PREFIX,
  ignoreMessageInCommandEvent: true
});

chatbox.openServer(process.env.PORT);
chatbox.loginWithAppState(process.env.APPSTATE);
chatbox.on('ready', (_, bid) => console.log("Logged in as", bid, `[${process.env.PREFIX}]`));

chatbox.on('command', async (command) => {
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

chatbox.on('error', (e) => {
  console.error("login error");
  console.error(e);
});