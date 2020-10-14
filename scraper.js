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
    options["proxy"] = [
      "161.202.226.194:80",
      "169.57.1.84:8123",
      "169.57.1.85:8123",
      "169.57.1.84:80",
      "169.57.1.84:25",
      "72.249.76.221:3128",
      "socks5://119.28.75.189:10800",
      "3.92.176.124:80",
      "18.141.212.115:80",
      "51.81.82.175:80",
      "52.149.152.236:80",
      "5.189.133.231:80",
      "socks5://163.172.101.112:1080",
      "102.129.249.120:8080",
      "102.129.249.120:3128",
      "191.96.42.80:3128",
    ];
    accounts.forEach((account) => {
      console.log("trabajando", account);
      it.user(account, { count: 0 })
        .then((counter) => {
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
              console.log("err raspando en", account, err);
            });
        })
        .catch((err) => console.log("error datos en ", account, err));
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
