#!/bin/bash

ibmcloud login -a cloud.ibm.com --apikey $devops_apikey -r us-south -g Default -o pasha.kxml@gmail.com -s dev2
ibmcloud target -g Default
## cd ./LAB-5 
## rem ibmcloud fn deploy --manifest rss-srvc-demo.yml --docker pshkxml/icfrss:1.0.1 
ibmcloud fn package create rss-srvc-demo
ibmcloud fn action update rss-srvc-demo/RSS-ExtrObject --docker pshkxml/icfrss:1.0.1 src/RSS-ExtrObject.js
ibmcloud fn service bind cloud-object-storage rss-srvc-demo --keyname cloud-object-storage-bi-cos-static-web-hosting-c2i

ibmcloud fn package list

