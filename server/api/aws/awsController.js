const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
  

const S3 = new AWS.S3();
const SQS = new AWS.SQS({region:'us-east-1'})


const { Pool, Client } = require('pg')

const pool = new Pool({
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
    get(req,res,next){        
        console.log(`Hello............AWS`);

        //putObjectS3();

        //PutSQSMessage(req.appName);
        
        getDbRecords();

        res.status(200).send(JSON.stringify('Hello'));
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
        Body: "test test test", 
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
    try {
        let dbResult = await pool.query('select * from account');
        for (u of dbResult.rows) {
            //console.log(`${u.username}`);            
            //Object deconstructions 
            let {
                email: b,
                username: X           
            } = u;
            console.log(`email is ==>${b} & user Name is ${X}`);
            
        }
    } catch (error) {
        console.log(error);
    }
    finally{
      //  pool.end();
    }

    

}
