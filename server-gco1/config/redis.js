const { Redis } = require("ioredis");

const redis = new Redis({
  port: 12548,
  host: "redis-12548.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  username: "default",
  password: "88OZ5kJhT8ha3BkL0XBDbUDzqhf0ApLw",
  db: 0,
});

module.exports = redis;
