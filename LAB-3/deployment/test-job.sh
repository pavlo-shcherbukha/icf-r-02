#!/bin/bash
#Invoke tests here

echo ==== LOGIN =======================
ibmcloud login -a cloud.ibm.com --apikey $devops_apikey -r eu-gb -g default -o panama -s shdev

echo ================================
echo INVOCE
cd ./bnkapi-customer
 ibmcloud fn action invoke bankapi-customer/getCustomerbyId --param-file params/getCustomerByID.json --result
echo ================================