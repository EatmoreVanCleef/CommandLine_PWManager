Do you have trouble remembering all Username/Passwords for all your online accounts? Then Have I got the commandline tool for you!

Node JS, Yargs, Crypto-JS, and Node-Persist combine to allow you to store your Username and Password for all your online accounts. Everything is encrypted and only your Master Password can unlock your secrets!

Get started: run 'npm install' from command line to install dependencies

RUN:

Create a new account object. Must provide account name, username, and  account password, as well as master password:
> node app.js -n [AccountName] -u [AccountUsername] -p [AccountPassword] -m [MasterPassword]

Example:
> node app.js -n Friendface -u roy@friendface.com -p pass123 -m masterpass123

Fetch account object. Must provide account name and master password:
> node app.js -n [AccountName] -m [MasterPassword]

Example:
> node app.js -n Friendface -m masterpass123

Get help:
> node app.js --help
