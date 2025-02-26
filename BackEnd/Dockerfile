# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including devDependencies like nodemon)
RUN npm install --include=dev

# Install nodemon globally (to ensure it's available in the PATH)
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the backend port (3500)
EXPOSE 3500

# Command to run the application
CMD ["nodemon", "index.js"]