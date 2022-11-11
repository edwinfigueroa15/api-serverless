const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const middy = require('middy');
const { jsonBodyParser } = require('middy/middlewares')

const add = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const { title, description } = event.body;
  const createdAt = new Date();
  const id = v4();

  try {
    const body = { id, title, description, done: false, createdAt }
    await dynamoDb.put({ 
      TableName: 'TaskTable',
      Item: body
    }).promise()

    return { status: 200, body: { data: body } }

  } catch (error) {
    return { status: 400, body: { error: error } }
  }
};

module.exports = { 
  add: middy(add).use(jsonBodyParser())
}