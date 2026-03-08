# syntax=docker/dockerfile:1.20
FROM public.ecr.aws/docker/library/node:24.14-trixie-slim
RUN apt-get -y update \
  && apt-get -y upgrade \
  # && apt-get --no-install-recommends -y install \
  #       curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.0.0-rc1 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /usr/src/app
COPY --parents ./package*.json ./packages/api/package.json ./packages/gui/package.json ./packages/types/package.json ./
RUN npm ci
COPY . ./
RUN npm run build -w @avshare3/api \
  && npm run nuxt:prepare -w @avshare3/gui \
  && npm run generate -w @avshare3/gui
CMD [ "npm", "run", "start", "-w", "@avshare3/api" ]
