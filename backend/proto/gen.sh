#!/bin/bash

PROJECTS=("backend/auth" "backend/gateway")

echo "🚀 Generating proto types..."

rm -rf ./dist && mkdir -p ./dist

protoc \
  --plugin="protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out=./dist \
  --ts_proto_opt=nestJs=true,outputServices=grpc-js \
  --proto_path=./src \
  ./src/*.proto

if [ $? -eq 0 ]; then
  echo "✅ Types successfully generated"
else
  echo "❌ Type generation error"
  exit 1
fi

echo "📁 Copying types to projects..."

for project in "${PROJECTS[@]}"; do
  target_dir="/projects/${project}/src/proto"
  echo "📂 Copy to ${project}/src/proto..."
  mkdir -p "${target_dir}"
  rm -rf "${target_dir:?}"/*
  cp -r ./dist/* "${target_dir:?}"/
  cp -r ./src/* "${target_dir:?}"/
  echo "✅ Success copy to ${project}"
done

echo "🎉 Generation and copying completed!"