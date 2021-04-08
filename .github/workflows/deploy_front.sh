rm -rf /var/www/html/*
cp -rf build/* /var/www/html/
cp .github/workflows/.htaccess /var/www/html/ -f