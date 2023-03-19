import readline from "readline";
import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
  })
);

const userInterface = new readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

userInterface.prompt();

//This event is fired when the user presses enter
userInterface.on("line", async input => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }]
  });
  console.log(res.data.choices[0].message.content);
  userInterface.prompt();
});
