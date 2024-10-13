# Use the Node.js base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy the dependency configuration files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application
COPY . .

# Expose the port on which the application will listen
EXPOSE 3000

# Use PM2 to start the application
CMD ["pm2-runtime", "start", "bin/www"]