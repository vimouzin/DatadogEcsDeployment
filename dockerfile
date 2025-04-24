# Use the node:14-buster-slim image
FROM --platform=linux/amd64 node:18-bullseye-slim


# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy application code to the container
COPY . .

# Expose the port your application runs on
EXPOSE 3000

CMD ["node", "app.js"]
