FROM node:22 AS build

WORKDIR /app

COPY . .

# RUN npm run generate-api
RUN npm i --legacy-peer-deps && npm run build || exit 0
RUN npm prune --production --legacy-peer-deps

# ------------------
FROM node:22 AS run

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /app .
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

RUN ulimit -c unlimited

LABEL maintainer="Aaron Pritzlaff <aaron@kindservices.co.uk>"
LABEL usage="docker run -p 3000:3000 docker.io/kindservices/eval-radar:latest"
LABEL version="0.0.1"
LABEL org.opencontainers.image.source="https://github.com/aaronp/eval-radar"
LABEL org.opencontainers.image.url="https://kindservices.co.uk"
LABEL license="Apache-2.0"
LABEL vendor="Kind Services Ltd"


ENTRYPOINT ["node", "build"]
