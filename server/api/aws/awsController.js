//const AWS = require('aws-sdk');
//var express = require('express');
var AWSXRay = require('aws-xray-sdk');
var app ;//= express();

var AWS = AWSXRay.captureAWS(require('aws-sdk'));
AWS.config.setPromisesDependency(require('bluebird'));
  


const S3= AWSXRay.captureAWSClient(new AWS.S3());
const SQS = new AWS.SQS({region:'us-east-1'})




//const { Pool, Client } = require('pg');
var pg = AWSXRay.capturePostgres(require('pg'));



const pool = new pg.Pool({
    user: 'dbadmin',
    database: 'pgdb',
    password: 'rds-postgres12',
    port: 5432,
    host: 'mydbinstance.cbojipsq8az2.us-east-1.rds.amazonaws.com'
});




    //   const client = new Client({
    //     user: 'dbuser',
    //     host: 'database.server.com',
    //     database: 'mydb',
    //     password: 'secretpassword',
    //     port: 3211,
    //   })
    //   client.connect()

    //   client.query('SELECT NOW()', (err, res) => {
    //     console.log(err, res)
    //     client.end()
    //   })  




module.exports = {
    async get(req,res,next){       
         
        console.log(`Hello............AWS Start`);
        //testXray();
       
        AWSXRay.captureAsyncFunc('get', function(subsegment) {
            console.log(`${subsegment}`);
            try {
            
                res.status(200).send(putObjectS3());
                 console.log(`Hello............AWS End`);
            } catch (error) {
                console.error(error);
                console.log(`Hello............AWS Error`);
                res.status(200).send(error.stack);
            }
            subsegment.close();
        });

        
        

        //PutSQSMessage(req.appName);
        // try {
        //     var dbResults=await getDbRecords();
        //      //console.log(`${dbResults}`);
        //     res.status(200).send(JSON.stringify(dbResults));
        //     console.log(`Hello............AWS End`);
        // } catch (error) {
        //     console.error(error);
        //     console.log(`Hello............AWS Error`);
        //     res.status(200).send(error.stack);
        // }
        
        next();
    }

}

async function getBucketsAsync(){

    try {
       
        return await  S3.listBuckets().promise();

    }catch (error) {
        console.log(`ERRRR is => ${error}`);
    }
    finally{
        console.log('In finally');
    }
    

}

async function putObjectS3(binary) {
    var params = {
        Body: "test test test with Xray", 
        Bucket: "frontend-tutux-build", 
        Key: "exampleobject", 
        ServerSideEncryption: "AES256", 
        Tagging: "key1=value1&key2=value2",
        ContentType:'text/html'

       };
    
    var res= await S3.putObject(params).promise();

    return res;


}

async function PutSQSMessage(messageFromGet){
  
    var sqsUrl= 'https://sqs.us-east-1.amazonaws.com/583688700246/GetNodeMessage';
    var params = {
        QueueUrl: sqsUrl,
        MessageBody: messageFromGet
    }
    var res = await SQS.sendMessage(params).promise();

    return res;

}

async function getDbRecords(params) {
    
    // try {
        // let dbResult = await pool.query('select * from account');
        // for (u of dbResult.rows) {
        //     //console.log(`${u.username}`);            
        //     //Object deconstructions 
        //     let {
        //         email: b,
        //         username: X           
        //     } = u;
        //     console.log(`email is ==>${b} & user Name is ${X}`);
            
        // }

        const client = new pg.Client({
            user: 'dbadmin',
            database: 'pgdb',
            password: 'rds-postgres12',
            port: 5432,
            host: 'mydbinstance.cbojipsq8az2.us-east-1.rds.amazonaws.com'
          })

          await client.connect()

          let tm = await client.query('SELECT NOW()');
          console.log(tm);
          
        //   let dbResult = await client.query('select * from account');
        //    for (u of dbResult.rows) {
        //         //console.log(`${u.username}`);            
        //         //Object deconstructions 
        //         let {
        //             email: b,
        //             username: X           
        //         } = u;
        //         console.log(`email is ==>${b} & user Name is ${X}`);
        //     }


        return  //dbResult.rows;
    // } catch (error) {
    //     console.error(error.stack);
    //     //throw error;
    // }
    // finally{
    //   //  pool.end();
    // }



    

}


async function testXray(params) {

    AWSXRay.captureAsyncFunc('testXray', function (subsegment) {
        //'subsegment' here is the newly created and exposed subsegment for the async
        //request, and must be closed manually (this ensures timing data is correct)

        for (let index = 0; index < 11; index++) {
            console.log(`${index}`);

        }
        subsegment.close();


    });

    return 

}
