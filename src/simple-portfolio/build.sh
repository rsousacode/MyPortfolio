#!/usr/bin/env bash

npm run build

cp public/build/home.js ~/Local\ Sites/rui-sousa/app/public/wp-content/themes/portfolio-theme/js/
cp public/build/home.css ~/Local\ Sites/rui-sousa/app/public/wp-content/themes/portfolio-theme/css/
