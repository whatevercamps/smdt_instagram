"use strict";
const fs = require("fs");
const scraper = require("./scraper.js")();

const args = process.argv.slice(2);

const hashtags = [];
let users = require("./users.js");
users = users.map((user) => user.replace("@", ""));
let posts = [];

if (args[0]) {
  fs.mkdir(args[0], () => {
    scraper.hashtagsScaper(hashtags, args[0]);
    scraper.usersScraper(users, args[0], {
      download: true,
      asyncDownload: 8,
    });
    if (posts && posts.length)
      fs.mkdir(`${args[0]}/comments`, () => {
        scraper.commentsScraper(posts, `${args[0]}/comments`);
      });
  });
} else {
  console.log("por favor ingrese nombre de la carpeta de salida");
}
