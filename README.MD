Do you have trouble remembering all Username/Passwords for all your online accounts? Then have I got the commandline tool for you!

Node JS, Yargs, Crypto-JS, and Node-Persist combine to allow you to store your Username and Password for all your online accounts. Everything is encrypted and only your Master Password can unlock your secrets!

Get started: run 'npm install' from command line to install dependencies

RUN:

Create a new account object. Must provide account name, username, and  account password, as well as master password:
> node app.js create -n [AccountName] -u [AccountUsername] -p [AccountPassword] -m [MasterPassword]

Get account object. Must provide account name and master password:
> node app.js get -n [AccountName] -m [MasterPassword]

Get help:
> node app.js --help

Example create:
> node app.js create -n Friendface -u roy@friendface.com -p pass123 -m masterpass123

Example get:
> node app.js get -n Friendface -m masterpass123
