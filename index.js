const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const SUDOKU_TABLE = process.env.SUDOKU_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.get("/prob/easy", async function (req, res) {
  const pids = [
    "e0474", "e0483", "e0493", "e0499",
    "e0507", "e0509", "e0511", "e0517",
    "e0518", "e0519", "e0520", "e0521",
    "e0522", "e0523", "e0524", "e0539"
  ];
  const pid = pids[Math.floor(Math.random() * pids.length)];
  const params = {
    TableName: SUDOKU_TABLE,
    Key: {
      probId: pid,
    },
  };
  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      const { probId, prob } = Item;
      res.json({ probId, prob });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find problem with provided "probId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive prob" });
  }
});

app.get("/prob/:probId", async function (req, res) {
  const params = {
    TableName: SUDOKU_TABLE,
    Key: {
      probId: req.params.probId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      const { probId, prob } = Item;
      res.json({ probId, prob });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find problem with provided "probId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive prob" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
