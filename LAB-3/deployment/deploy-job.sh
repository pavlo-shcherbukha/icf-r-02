#!/bin/bash

ibmcloud login -a cloud.ibm.com --apikey $devops_apikey -r us-south -g Default -o pasha.kxml@gmail.com -s dev2
ibmcloud target -g Default
## cd ./LAB-3 
ibmcloud fn deploy --manifest cloudant-srvc-demo.yml 
ibmcloud fn service bind cloudantnosqldb  cloudant-srvc-demo --instance Cloudant-q2 --keyname ICF-Cloudant-credentials-1
ibmcloud fn package list

