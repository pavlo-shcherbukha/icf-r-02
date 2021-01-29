#!/bin/bash

ibmcloud login -a cloud.ibm.com --apikey $devops_apikey -r us-south -g Default -o pasha.kxml@gmail.com -s dev2
ibmcloud target -g Default
## cd ./LAB-4 
ibmcloud fn deploy --manifest cos-srvc-demo.yml 
ibmcloud fn service bind cloud-object-storage cos-srvc-demo --keyname cloud-object-storage-bi-cos-static-web-hosting-c2i
ibmcloud fn package list

