/**
  *
  * main() will be invoked when you Run This Action.
  * @see https://cloud.ibm.com/apidocs/cloudant?code=node#introduction
  * @see https://github.com/ibm/cloudant-node-sdk
  * @see https://cloud.ibm.com/apidocs/cloudant?code=node#putdatabase
  * 
  * @param Cloud Functions actions accept a single parameter,
  *        which must be a JSON object.
  * 
  * In this case, the params variable will look like:
  *     { "name": "xxxx" }
  *
  * @return which must be a JSON object.
  *   OK=       {  "ok": true , "resp": ["noderedapp","sensorsdata"]}
  *   ERR =     {  "ok": false , "err": "eroro message", erro: { errobj: {....}}}
  */
 
function main(params) {

    console.log('Function Started');
    var authenticator;
    var service;
    try{
                const { CloudantV1 } = require('@ibm-cloud/cloudant');
                const { IamAuthenticator } = require('ibm-cloud-sdk-core');

                var l_dburl = params.__bx_creds.cloudantnosqldb.url;
                var l_apikey = params.__bx_creds.cloudantnosqldb.apikey;
                var l_dbname = params.dbname ;

                authenticator = new IamAuthenticator({
                    apikey: l_apikey
                });
                
                service = new CloudantV1({
                    authenticator: authenticator
                });
                
                service.setServiceUrl(l_dburl);
                

    } catch ( err ) {
               console.log( 'Error : ' + err.message); 
               return {  ok: false,  error: err.message  };
                 
    }

    console.log('Create DB ' + params.dbname );
    return createDatabase(service,params.dbname )
    .then( body => {
            console.log('Результат створення БД: ');
            console.log(  body);    
            console.log( 'Формую відповідь' );
            return Promise.resolve( { ok: body.ok , dbname: params.dbname } );        
    })
    .catch (err => { 
            var eobj = formatError( err );
            console.log( 'Помилка в роботі функції:  ' + JSON.stringify( eobj  )   );
            return   Promise.reject( new Error( eobj.message ) );
    });
}  

function createDatabase(cloudant, dbName) {

    return new Promise(function (resolve, reject) {
        var l_cmd = { db: dbName,  partitioned: false }
        cloudant.putDatabase(l_cmd)
        .then ( resp => {
             console.log(  JSON.stringify( resp.result ) );
             resolve(resp.result);
        })
        .catch( err => {
            console.log('error: ' + err.status + ' message: ' + err.message + ' desc:' + err.body + ' ' + err.stack);
            reject(err);

        });
    });
}

function formatError(  err ){
    var verrobj = {  ok: false, code: err.status, message: JSON.parse(err.body).reason, errobj: JSON.parse(err.body)  };
    return verrobj;

}


  exports.main = main;


  