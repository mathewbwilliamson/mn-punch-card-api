# Deployment

-   Right now, a very manual process.
-   Don't forget that Dev DB should be pointed at here. Env here should connect to Dev.

-   Go to their terminal and git pull.
-   npm i if needed
-   PM2: /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2

*   Create an Instance

-   From within the repositories/mn-punch-card-api folder
-   /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2 start ./src/index.ts

*   List all apps

-   /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2 list

*   Restart app

-   /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2 restart 0
