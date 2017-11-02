var dynamodb = new AWS.DynamoDB({
    region: "ap-southeast-2",
    accessKeyId: CONFIG.AWS_ACCESS_KEY,
    secretAccessKey: CONFIG.AWS_SECRET_KEY
});

var getAllEvents = {
    TableName: 'Events',
    Select: 'SPECIFIC_ATTRIBUTES',
    AttributesToGet: [
        'EventID',
        'Timestamp',
        'SourceType',
        'dB_level',
        'S3link'
    ]

};

var loopEvent = {
    EventID: "",
    Timestamp: "",
    SourceType: "",
    dB_level: "",
    S3link: ""
};

var eventList = [];








function getEvents(callback) {
    // console.log("Getting All Events from the Database");

    var searchParams = {
        TableName: 'Events',
        Select: 'SPECIFIC_ATTRIBUTES',
        AttributesToGet: [
            'EventID',
            'Timestamp',
            'SourceType',
            'dB_level',
            'S3link'
        ]

    };

    dynamodb.scan(searchParams, function(err, data) { // SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
        if (err) {
            console.log(err, err.stack);
        } else {
            // console.log("Printing Out Data");
            console.log(data);
            callback(data);
        }
    });
}



function sortList(eventList) { //Orders list in eventId order MAKE ONE FOR TIMESTAMP SORTING

    eventList.sort(function(a, b) {
        var idA = a.EventID.toLowerCase(),
            idB = b.EventID.toLowerCase()
        if (idA < idB)
            return -1
        if (idA > idB)
            return 1
        return 0
    })

    populateList(eventList);

}



function getEventsByDeviceID(deviceID, callback) { // For Events Page

    // console.log("Getting All Events from the Database");

    var searchParams = {
        ExpressionAttributeValues: {
            ":a": {
                S: deviceID
            }
        },
        FilterExpression: "DeviceID = :a",
        TableName: "Events"
    };

    dynamodb.scan(searchParams, function(err, data) { // SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
        if (err) {
            console.log(err, err.stack);
        } else {
            // console.log("Printing Out Data");
            console.log(data);

            callback(data);
        }
    });

}