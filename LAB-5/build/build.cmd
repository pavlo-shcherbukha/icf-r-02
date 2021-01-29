
# построить образ
docker build -t pshkxml/icfrss .

# tag
docker tag pshkxml/icfrss:latest pshkxml/icfrss:1.0.1

# push to docker
docker push pshkxml/icfrss:1.0.1


rem #deployment

rem # ibmcloud fn action update appid-be/getuserprofile --docker pshkxml/icfrss:1.0.1 ./getuserprofile.js

pause