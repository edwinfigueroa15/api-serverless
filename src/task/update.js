const AWS = require('aws-sdk');

module.exports.update = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()
  const { id } = event.pathParameters;
  const { title, description, done } = JSON.parse(event.body);

  try {
    const body = { title, description, done }
    const response = await dynamoDb.update({ 
      TableName: 'TaskTable',
      Key: { id },
      ExpressionAttributeValues: {
        ':title': title,
        ':description': description,
        ':done': done,
      },
      UpdateExpression: 'set title = :title, description = :description, done = :done',
      ReturnValues: 'ALL_NEW'
    }).promise()

    return { status: 200, body: { data: response.Attributes } }

  } catch (error) {
    return { status: 400, body: { error: error } }
  }
};