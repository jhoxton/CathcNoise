// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
  ExpressionAttributeValues: {
    'DeviceID': DeviceID,
    'Timestamp': Timestamp,
    'EventID': 'EventID'
   },

 KeyConditionExpression: 'DeviceID = :DeviceID and Timestamp = :Timestamp',
 FilterExpression: 'contains (DeviceID :Timestamp',
 TableName: 'EVENTS_TABLE'
};

docClient.query(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Items);
  }
});