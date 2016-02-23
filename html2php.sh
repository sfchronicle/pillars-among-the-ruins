#!/bin/bash
for f in $(find . -type f -name '*.html')
do 
    mv $f $(echo "$f" | sed 's/html$/php/')
done