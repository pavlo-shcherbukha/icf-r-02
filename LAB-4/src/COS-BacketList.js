/**
  *
  * main() will be invoked when you Run This Action.
  * @see https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-node#node-examples-new-file
  * @see https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-getting-started-cloud-object-storage#gs-add-objects
  * @see https://cloud.ibm.com/docs/openwhisk?topic=openwhisk-pkg_obstorage#pkg_obstorage_write
  * 
  * @param Cloud Functions actions accept a single parameter,
  *        which must be a JSON object.
  * 
  * {                                                                  
  *      "pub_endpoint": "s3.",
  *      "bucket": "c"  
  *  }                                                                  
  *
  * 
  *
  * @return 
  * {
  *  "ok": true,
  *  "result": {
  *      "Buckets": [
  *          {
  *              "Name": "cloud-object-storage-bi-cos-static-web-hosting-c2i",
  *              "CreationDate": "2021-01-27T18:53:27.679Z"
  *          },
  *          {
  *              "Name": "demostrg",
  *              "CreationDate": "2021-01-27T19:00:00.706Z"
  *          }
  *      ],
  *      "Owner": {
  *          "DisplayName": "e75b939f-1beb-4b4f-8050-0545c5086725",
  *            "ID": "e75b939f-1beb-4b4f-8050-0545c5086725"
  *        }
  *    }
  *}
  *
  */
 
function main(params) {

    console.log('Function Started');
    const myCOS = require('ibm-cos-sdk');
    var config = {
        endpoint: params.pub_endpoint,
        apiKeyId: params.__bx_creds["cloud-object-storage"].apikey,
        ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
        serviceInstanceId: params.__bx_creds["cloud-object-storage"].resource_instance_id
    };
                
    var cosClient = new myCOS.S3(config);
    return cosClient.listBuckets()
    .promise()
    .then( data => {
        console.log('Bucket List ');
        console.log(  data );    
        return Promise.resolve( { ok: true , result: data } );        
    })
    .catch (err => { 

        console.log( 'Error:  ' + err.message   );
        return   Promise.reject( err );
    });
  
                 
}


    


  exports.main = main;


  