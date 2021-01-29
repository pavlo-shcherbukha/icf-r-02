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

 
  it('function COS-GetObject:' + ' Expect retrieve item from COS Backet ', function(done){

    var vfunc = require('../src/COS-ListItems');
    var vprm = require('../params/COS-ListItems.json');
    var vbx_creds = require('../params.localdev/COS_C2I_BIND.json');
    vprm.__bx_creds = vbx_creds;
    vfunc.main(  vprm  )
    .then (res => {
      
      res.should.have.property('ok');
      res.ok.should.equal(true);
      res.should.have.property('result');
      res.result.should.have.property( 'IBMSSEKPEnabled' );
      res.result.should.have.property( 'Contents' );
      res.result.should.have.property( 'Name' );

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