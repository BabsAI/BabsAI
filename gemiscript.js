const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const botToken ='6895972691:AAE2yFU2Klq3GFB24ymQi7nbRyL_gr2KVBU';
const genAI = new GoogleGenerativeAI('AIzaSyBELlcuP3HkJhoLiLYl9z7FCUAl3G8YCCE');


const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply ('Hello Amie here, how can I help you today'));


bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  const chatId = ctx.chat.id;

  // Show typing action
  await ctx.replyWithChatAction('typing');

  // Use Generative AI to generate a response
  const model = genAI.getGenerativeModel({ model:"gemini-pro" });
  const result = await model.generateContent(text);
  const response = await result.response;
  const generatedText = response.text();

  // Send the generated text back to the user
  ctx.reply(generatedText);
});

bot.launch();