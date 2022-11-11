const AWS = require('aws-sdk');

module.exports.delete = async (event) => {
  try {
    const { id } = event.pathParameters;
    const dynamoDb = new AWS.DynamoDB.DocumentClient()
    const response = await dynamoDb.delete({
      TableName: 'TaskTable',
      Key: { id }
    }).promise()

    return { status: 200, body: { data: `Tarea ${id} eliminada` } }

  } catch (error) {
    return { status: 400, body: { error: error } }
  }
};