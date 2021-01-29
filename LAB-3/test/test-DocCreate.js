/*
*
*/ 
 
 
const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

var  test_env_lr = true;
var http = require('http');

describe(' Local test IBM Cloud Functions ', function() {


  before(done => {
        done();
    
  });

 
  it('function DocCreate:' + ' Expect create document', function(done){

    var vfunc = require('../src/DocCreate');
    var vprm = require('../params/DocCreate.json');
    var vbx_creds = require('../params.localdev/cloudant.json');
    vprm.__bx_creds = vbx_creds;
  
    vfunc.main(  vprm  )
    .then (res => {
         res.should.have.property('ok');
         res.ok.should.equal(true);
         res.should.have.property('dbname');
         res.dbname.should.equal( vprm.dbname  );
         res.should.have.property('id');
         res.should.have.property('rev');


       if (test_env_lr) {
                console.log( JSON.stringify(  res  )  );
        }    
        done();

    })
    .catch ( err => {
            console.log(err.message);
            done(err);
  
    });
  });  //it



  // end of test
  after(done => {
       done();    
  });
});