# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use Nginx to serve the built application
FROM nginx:1.19.0-alpine

# Copy the Nginx configuration file
COPY ./default.conf /etc/nginx/conf.d/default.conf
# Copy the built application from the build container
COPY --from=build /app/build /usr/share/nginx/html

# Copy the script that generates the env-config.js file
COPY ./env.sh .
# Make the script executable
RUN chmod +x env.sh
# Start Nginx and run the script
CMD ["/bin/sh", "-c", "/env.sh && nginx -g 'daemon off;'"]