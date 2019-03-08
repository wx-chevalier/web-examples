#!/bin/bash
set -ex

ncu
 
(cd ./packages/rtw-core && ncu)
(cd ./packages/rtw-bootstrap && ncu)
(cd ./packages/rtw-host-app && ncu)
(cd ./packages/rtw-mobx-app && ncu)
