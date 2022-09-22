'use strict';
const http = require("http");
module.exports.hello = async (event) => {
    http.get('http://aws.amazon.com');
    return {
        statusCode: 200,
        body: "Success!",
    };
};
