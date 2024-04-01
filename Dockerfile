# Using node.js image
FROM node:14-alpine

# Set the work directory in docker
WORKDIR /usr/src/app

# copy package.json and package-log.json to install dependencies 
COPY package*.json ./

# install dependencies
RUN npm install --only=prod

# copy all files
COPY . .

# port
EXPOSE 3005

# command to execute the app when docker starts
CMD ["node", "build/index.js"]
