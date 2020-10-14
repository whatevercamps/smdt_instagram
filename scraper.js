"use strict";
const it = require("instatouch");
const fs = require("fs");

module.exports = function scraper() {
  const sc = {};
  const defaultOptions = {
    count: 10,
    download: true,
  };

  sc.hashtagsScaper = (hashtags, path, paramOptions) => {
    let options = paramOptions ? { ...paramOptions } : { ...defaultOptions };

    hashtags.forEach((ht) => {
      it.hashtag(ht, { ...options, filepath: `${path}/hashtags/` }).then(
        (res) => {
          fs.writeFile(
            `${path}/hashtags/${ht}.json`,
            JSON.stringify(res),
            function (err) {
              if (err) return console.log(err);
              console.log("terminado", ht);
            }
          );
        }
      );
    });
  };

  sc.usersScraper = (accounts, path, paramOptions) => {
    let options = paramOptions ? { ...paramOptions } : { ...defaultOptions };

    accounts.forEach((account) => {
      it.user(account, { count: 0 }).then((counter) => {
        it.user(account, {
          ...options,
          filepath: `${path}/users/`,
          count: options.count || counter.count,
        })
          .then((res) => {
            fs.writeFile(
              `${path}/users/${account}.json`,
              JSON.stringify(res),
              function (err) {
                if (err) return console.log(err);
                console.log("terminado", account);
              }
            );
          })
          .catch((err) => {
            console.log("err", err);
          });
      });
    });
  };

  sc.commentsScraper = (posts, path) => {
    posts.forEach((post) => {
      it.comments(post, { filetype: "csv", filepath: `${path}` })
        .then(() => {
          console.log("terminado", post);
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  return sc;
};
