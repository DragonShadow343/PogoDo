FROM node:18

# Set the working directory to /BackEnd/pogodo
WORKDIR /BackEnd/pogodo

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of your application files
COPY . .

# Expose the necessary port
EXPOSE 3500

# Start the app using nodemon
CMD ["nodemon", "index.js"]