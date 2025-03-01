#!/bin/bash

# デプロイパッケージ用のディレクトリを作成
mkdir -p .aws-sam/build/MyFunction

# 外部ライブラリをインストール
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner @fastify/swagger@9 @fastify/swagger-ui@5 --prefix .aws-sam/build/MyFunction

# # ソースコードをビルド ... は sam build に任せる
# esbuild src/index.ts \
#   --bundle \
#   --minify \
#   --sourcemap \
#   --platform=node \
#   --target=es2020 \
#   '--external:@aws-sdk' \
#   '--external:@fastify/swagger' \
#   '--external:@fastify/swagger-ui' \
#   --outfile=.aws-sam/build/MyFunction/index.js
