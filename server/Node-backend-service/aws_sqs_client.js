const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));

    const S3 = new AWS.S3();
    const SQS = new AWS.SQS({ region: 'us-east-1' })

    var inCall = false;
    //var intervalID = setInterval(CheckSQS, 4000);


    async function CheckSQS() {
        console.log('Check SQS');
        incall = true;
        var sqsUrl = 'https://sqs.us-east-1.amazonaws.com/583688700246/GetNodeMessage';

        var params = {
            QueueUrl: sqsUrl
        }

        let resp = await SQS.receiveMessage(params).promise();

        for (m of resp.Messages) {

            console.log('message is =>' + m);
            var handle = m.ReceiptHandle;
            SQS.deleteMessage({
                QueueUrl: sqsUrl,
                ReceiptHandle: handle
            })
        }

        incall = false;

    }

//CheckSQS();