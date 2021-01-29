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
  *      }                                                                  
  *
  * 
  *
  * @return 
  * {
  *  "ok": true,
  *  "result": {
  *      "IBMSSEKPEnabled": "false",
  *      "IsTruncated": false,
  *      "Marker": "",
  *      "Contents": [
  *          {
  *              "Key": "error.html",
  *              "LastModified": "2021-01-27T18:54:09.278Z",
  *              "ETag": "\"384eb2cf1e\"",
  *              "Size": 55534,
  *              "StorageClass": "STANDARD",
  *              "Owner": {
  *                  "DisplayName": "e75b939f-1beb-4",
  *                  "ID": "e75b939f-1beb"
  *              }
  *          },
  *          {
  *              "Key": "fdata.txt",
  *              "LastModified": "2021-01-28T20:03:08.450Z",
  *              "ETag": "\"27e3d79ef245\"",
  *              "Size": 38,
  *              "StorageClass": "STANDARD",
  *              "Owner": {
  *                  "DisplayName": "e75b939f-",
  *                  "ID": "e75"
  *              }
  *          }
  *      ],
  *      "Name": "cloud-object-storage",
  *      "Prefix": "",
  *      "Delimiter": "",
  *      "MaxKeys": 1000,
  *      "CommonPrefixes": []
  *  }
  * }
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
    var o_dcs = {   Bucket: params.bucket };
    return cosClient.listObjects(o_dcs)
    .promise()
    .then( data => {
        console.log(' List Objects ');
        console.log(  data );    
        return Promise.resolve( { ok: true , result: data } );        
    })
    .catch (err => { 

        console.log( 'Error:  ' + err.message   );
        return   Promise.reject( err );
    });
  
                 
}


    


  exports.main = main;


  