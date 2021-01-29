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
  *     {  
  *          "pub_endpoint": "s3.eu-de.cloud-object-storage.appdomain.cloud",
  *          "bucket": "cloud-object-storage-bi-cos-static-web-hosting-c2i",
  *          "file_name": "test_file.txt"
  *      }                                                                  
  *
  * 
  *
  * @return 
  *  {
  *  "ok": true,
  *  "result": {
  *      "AcceptRanges": "bytes",
  *      "LastModified": "Thu, 28 Jan 2021 21:52:07 GMT",
  *      "ContentLength": "29",
  *      "ETag": "\"59\"",
  *      "ContentType": "application/octet-stream",
  *      "Metadata": {},
  *      "Body": {
  *          "type": "Buffer",
  *          "data": [
  *              116,
  *              101,
  *              115
  *          ]
  *        }
  *    }
  * }
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
    var o_dcs = {   Bucket: params.bucket,
                    Key:    params.file_name
        };
    return cosClient.getObject(o_dcs)
    .promise()
    .then( data => {
        console.log(' Get Objects ');
        console.log(  data );    
        return Promise.resolve( { ok: true , result: data } );        
    })
    .catch (err => { 

        console.log( 'Error:  ' + err.message   );
        return   Promise.reject( err );
    });
  
                 
}


    


  exports.main = main;


  