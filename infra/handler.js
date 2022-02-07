const serverless = require("serverless-http");
const express = require("express");
require("dotenv").config();
const cryptom = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(cryptom.randomBytes);
const aws = require("aws-sdk");
const app = express();

// add credentials here if you want to use it
const region = "";
const bucketName = "";
const accessKeyId = "";
const secretAccessKey = "";
//
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});
app.get("/", async (req, res, next) => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: imageName + ".png",
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return res.status(200).json({
    message: uploadURL,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
