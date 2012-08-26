#!/bin/bash

js=$1
init=$2

`echo /*beejs auto creator*/ > $init`

`echo "(function(){var map={};var def=function(name,fn){map[name]=fn;};var require=function(name){var exports={};map[name](exports);return exports;};" >> $init`

str1='def("'
str2='",function(exports){'
str3='});'
bootfile=0

run(){
    if [ $bootfile -eq 1 ]
    then
        filename="$1.js"
        content="$str1$1$str2`cat $filename`$str3"
        `echo $content >> $init`
    else
        filename=$1
        bootfile=1
        bootfilecontent=`cat $filename`
    fi

    requirefile=`grep "require(\s*['\"]\w*['\"])" $filename | awk "{sub(/[^'\"]*/,\"\");sub(/\).*/,\"\");gsub(/['\"]*/,\"\");print}"`
    
    for f in $requirefile
    do
        if [ -e "$f.js" ] 
        then 
            run "$f"
        fi
    done
}

run $js

`echo $bootfilecontent >> $init`

`echo "})();" >> $init`
