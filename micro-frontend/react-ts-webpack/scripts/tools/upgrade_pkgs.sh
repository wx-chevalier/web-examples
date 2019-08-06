#!/bin/bash
set -ex

ncu
 
(cd ./packages/rtw-core && ncu -u)
(cd ./packages/rtw-bootstrap && ncu -u)
(cd ./packages/rtw-host-app && ncu -u)
(cd ./packages/rtw-mobx-app && ncu -u)
