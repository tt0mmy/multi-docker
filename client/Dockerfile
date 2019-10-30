# multi step build process docker file
# 2 blocks of config:
#  - build phase
#  - run phase

# tagging this phase as builder
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx
# AWS elastic beanstalk will look at this to map incoming traffic
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/defaut.conf
COPY --from=builder /app/build /usr/share/nginx/html