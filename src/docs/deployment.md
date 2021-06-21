# Deployment

- All of the below is no longer needed. Azure hosting is being used.
- In VSCode, click on Azure tab.
- In the Resource Groups, Azure Subscription 1 -> MathnasiumRewardCabinet
- In the App Service, Azure Subscription 1 -> MathnasiumRewardCabinetApi -> Deployments.
- Click on the Cloud Icon that says Deploy to Web App.

# To Look at Logs

- App Service, App Service, Azure Subscription 1 -> MathnasiumRewardCabinetApi
- Click on files, then you can look at Logs.
- Our logs are in newlogs.log.

---

- Right now, a very manual process.
- Don't forget that Dev DB should be pointed at here. Env here should connect to Dev.

- Go to their terminal and git pull.
- npm i if needed => npm run build if needed
- PM2: /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2

* Create an Instance

- From within the repositories/mn-punch-card-api folder
- /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2 start ./src/index.ts

* List all apps

- /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2 list

* Restart app

- /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2 restart 0

* List all the logs

- /home/newtampa/repositories/localPm2/node_modules/pm2/bin/pm2 logs
