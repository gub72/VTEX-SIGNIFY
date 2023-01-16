#!/bin/bash

cd store-theme/styles/css/

find . ! -name '.gitkeep'  -type f -exec rm -Rf -d  {} +
find . -empty -type d -delete
