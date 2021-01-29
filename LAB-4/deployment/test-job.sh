#!/bin/bash
#Invoke tests here

echo ==== LOGIN =======================
ibmcloud login -a cloud.ibm.com --apikey $devops_apikey -r us-south -g Default -o pasha.kxml@gmail.com -s dev2
ibmcloud target -g Default

echo ====================================================
echo TEST  cos-srvc-demo/COS-BacketList
echo ====================================================


 ibmcloud fn action invoke cos-srvc-demo/COS-BacketList --param-file params/COS-BacketList.json --result

echo ====================================================
echo TEST  cos-srvc-demo/COS-PutObject
echo ====================================================

 ibmcloud fn action invoke cos-srvc-demo/COS-PutObject --param-file params/COS-PutObject.json --result


echo ====================================================
echo TEST  cos-srvc-demo/COS-GetObject
echo ====================================================

 ibmcloud fn action invoke cos-srvc-demo/COS-GetObject --param-file params/COS-GetObject.json --result



echo ====================================================
echo TEST  cos-srvc-demo/COS-ListItems
echo ====================================================

 ibmcloud fn action invoke cos-srvc-demo/COS-ListItems --param-file params/COS-ListItems.json --result

