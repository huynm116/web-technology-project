FROM node:18
WORKDIR /app
RUN mkdir -p /app/backend
RUN mkdir -p /app/frontend
COPY ./backend/package*.json /app/backend
RUN cd /app/backend; npm install
COPY ./backend/* /app/backend
COPY ./frontend/*.json /app/frontend
RUN cd /app/frontend; npm install yarn
RUN yarn

COPY ./run.sh /run.sh
EXPOSE 3000

CMD ["/run.sh"]


