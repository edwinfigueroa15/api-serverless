const AWS = require('aws-sdk');

module.exports.getById = async (event) => {
  try {
    const { id } = event.pathParameters;
    const dynamoDb = new AWS.DynamoDB.DocumentClient()
    const response = await dynamoDb.get({
      TableName: 'TaskTable',
      Key: { id }
    }).promise()

    return { status: 200, body: { data: response.Item } }

  } catch (error) {
    return { status: 400, body: { error: error } }
  }
};