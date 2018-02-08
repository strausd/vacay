# Tells Docker to use the node@8.9.4 parent image
FROM node:8.9.4

# Install inotify for file watching
RUN apt-get install inotify-tools

# Make container directory for our code inside of Docker
RUN mkdir /code

# Set the container working directory to the one we just created
WORKDIR /code

# Copy all source files to container working directory
COPY . /code/

# Run npm install
RUN yarn install
