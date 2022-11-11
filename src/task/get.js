const AWS = require('aws-sdk');

module.exports.get = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient()
    const response = await dynamoDb.scan({ 
      TableName: 'TaskTable'
    }).promise()

    return { status: 200, body: { data: response.Items } }

  } catch (error) {
    return { status: 400, body: { error: error } }
  }
};