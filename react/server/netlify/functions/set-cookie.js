const cookie = require("cookie");
const axios = require("axios");
exports.handler = function (event, context, callback) {
  const parsedBody = JSON.parse(event.body);
  const { token } = parsedBody;

  const twoWeeks = 14 * 24 * 3600000;

  const netlifyCookie = cookie.serialize("nf_jwt", token, {
    secure: true,
    path: "/",
    maxAge: twoWeeks,
  });

  callback(null, {
    statusCode: 200,
    headers: {
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({ token }),
  });
};
