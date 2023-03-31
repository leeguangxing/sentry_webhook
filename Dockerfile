# Documents:
# https://hub.docker.com/_/node
# https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
# https://pm2.keymetrics.io/docs/usage/signals-clean-restart/

FROM node:14-slim
LABEL Description="This image is using PM2 as a layer between the container and node.js application."
COPY . /var/web
WORKDIR /var/web
RUN ["yarn", "global", "add", "pm2"]
RUN ["yarn", "install"]
EXPOSE 3000
CMD ["pm2-runtime", "start", "/var/web/ecosystem.config.js"]
