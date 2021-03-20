FROM ubuntu 

# ubuntu setup
RUN apt-get update -y
RUN apt-get upgrade -y 
RUN apt-get install nodejs -y && apt-get install npm -y
RUN apt-get git

# install curl for n
RUN apt-get install curl -y
RUN apt-get install vim -y 