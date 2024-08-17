
# Use Node alpine as base image
FROM node:alpine
# Change the working directory to /usr/src/app
WORKDIR /usr/src/app
# Copy the package.json and package-lock.json files to the /app directory
COPY package*.json ./
# Install
RUN npm install

# Copy the entire source code into the container
COPY . .
# Document the port that may need to be published
EXPOSE 5000

# Start the application
CMD ["npm","run", "dev"]

