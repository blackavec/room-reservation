# Preview

![Screenshot](screenshot.png "Screenshot")

# Run

```
mkdir ~/.data && cd ~/.data && mkdir mysql
composer docker-mysql && composer docker-phpmyadmin

composer install
composer dumpautoload -o

# to make DB
php artisan migrate:refresh

# install dependencies of nodejs
npm install

# run webpack with --watch
npm run dev

# production build of webpack
npm run build
```
