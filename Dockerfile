FROM public.ecr.aws/docker/library/node:24.12-slim
RUN apt-get -y update \
  && apt-get -y upgrade \
  # && apt-get --no-install-recommends -y install \
  #       curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY --parents ./package*.json ./packages/api/package.json ./packages/gui/package.json ./packages/types/package.json ./
RUN npm ci
COPY . ./
RUN npm run buildlocal -w @avshare3/api \
  && npm run generate -w @avshare3/gui
CMD [ "npm", "run", "startlocal", "-w", "@avshare3/api" ]
