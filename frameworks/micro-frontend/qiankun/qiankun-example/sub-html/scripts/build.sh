#!/bin/bash

# 把当前项目对外输出的文件都放到dist目录

rm -rf ./dist

mkdir ./dist

cp -r ./public/* ./dist/

cp -r ./js ./dist/js

