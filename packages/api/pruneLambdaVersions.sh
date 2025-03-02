#!/bin/bash

# 設定
REGION="ap-northeast-1"  # リージョンを指定
# FUNCTION_NAME="YOUR_FUNCTION_NAME"  # Lambda 関数名を指定
KEEP_VERSIONS=3  # 残すバージョンの数

# すべてのバージョンをリスト
versions=$(aws lambda list-versions-by-function --function-name ${FUNCTION_NAME} --region ${REGION} --query 'Versions[].[Version]' --output text | grep -v "\$LATEST" | sort -n)

# 古いバージョンを削除
count=0
total_versions=$(echo ${versions} | wc -w)
delete_count=$((${total_versions} - ${KEEP_VERSIONS}))
for version in ${versions}; do
  if [ ${count} -lt ${delete_count} ]; then
    echo "Deleting version ${version}"
    aws lambda delete-function --function-name ${FUNCTION_NAME} --qualifier ${version} --region ${REGION}
    count=$((count+1))
  else
    break
  fi
done

echo "Cleanup completed!"
