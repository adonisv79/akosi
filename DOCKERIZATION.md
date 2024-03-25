# Dockerizing NodeJS Projects

The goal here is to understand how to create images for our projects and uploading them to docker hub. the first thing to do is create a `Dockerfile` (no extensions) in the root of the nodejs project.

![Dockerfile created](/docs/images/guides/dockerization/DOCKERFILE_new.png "Dockerfile created")

Copy the following code inside it. note the following
* You can use a specific version of node. Change `node:latest` to any of the prefered images in https://hub.docker.com/_/node

```
#FROM node:latest
WORKDIR /app

# Declare environment variable defaults
ENV API_PORT=3000
ENV NODE_ENV=development

# COPY required local files
COPY ./package*.json ./
COPY ./src ./src

# Install or Build Dependencies
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
RUN pnpm install
RUN pnpm run build

# CLEANUP
RUN rm -rf ./src

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
```

after this, we can build using the following command. Note that `my-image-name:tag` should be set with the image name and tag/version you want the image to be.

```
docker build -t {your-dockerhub-username}/{my-image-name}:{tag} .
```

You can also add the following in your package.json scripts to automate the build later.

```
"scripts": {
  "docker:build": "docker build -t adonisv79/project-name:${npm_package_version} .",
  "docker:build-win": "docker build -t adonisv79/project-name:%npm_package_version% .",
}
```

Once finished runing, you can use `docker images` to list out all the images including the one you created

![Docker image created](/docs/images/guides/dockerization/DOCKER_image_created.png "Docker image created")

# Docker helpful commands

* `docker ps` - show running docker containers
* `docker ps -a` - show all containers
* `docker images` - shows all images in your local
* `docker rmi {imagename}:{tag}` - deletes the docker image from local
* `docker exec -it your-container-name sh` - enter the shell/bash of your container.

# Dockerhub deployment

make sure to have a dockerhub account. Login in your local using `docker login` command. you can then run the `docker push` command to deploy or create a script to help ease this step

```
"scripts": {
  "docker:publish": "docker push adonisv79/project-name:${npm_package_version}",
  "docker:publish-win": "docker push adonisv79/project-name:%npm_package_version%",
}
```

Once deployed, you should be able to browse it in hub.docker.com

![DockerHub uploaded](/docs/images/guides/dockerization/DOCKERHUB_deployed.png "DockerHub uploaded")