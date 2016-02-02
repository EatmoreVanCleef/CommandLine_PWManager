var crypto = require('crypto-js');
var storage = require('node-persist');

var argv = require('yargs')
        .command('create', 'Create an account', function(yargs) {
          yargs.options({
            name: {
              demand: true,
              alias: 'n',
              description: 'Account name (eg. Twitter, Facebook)',
              type: 'string'
            },
            username: {
              demand: true,
              alias: 'u',
              description: 'Account username or email',
              type: 'string'
            },
            password: {
              demand: true,
              alias: 'p',
              description: 'Account password',
              type: 'string'
            },
            masterPassword: {
              demand: true,
              alias: 'm',
              description: 'One string to rule them all',
              type: 'string'
            }
          }).help('help', 'Give me all the help!');
        })
        .command('get', 'Get an existing account', function(yargs) {
          yargs.options({
            name: {
              demand: true,
              alias: 'n',
              description: 'Account name (eg. Twitter, Facebook)',
              type: 'string'
            },
            masterPassword: {
              demand: true,
              alias: 'm',
              description: 'One string to rule them all',
              type: 'string'
            }
          }).help('help', 'Get some help');
        })
        .help('help', 'Try "node app.js [command] --help"')
        .argv;

var command = argv._[0];

storage.initSync();

console.log('Starting Password Manager');
console.log('Need help? Try typing "node app.js --help"');

if (command === 'create') {
  try {
      var newAccount = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password
          }, argv.masterPassword);
      console.log('Account created!');
      console.log(newAccount);
  } catch(err) {
    console.log(err);
    console.log('Unable to create account.');
  } 
} else if (command === 'get') {
  try {
      var fetchedAccount = getAccount(argv.name, argv.masterPassword);
      if (typeof fetchedAccount === 'undefined') {
        console.log('Account not found, or Master Password invalid.');
      } else {
        console.log('Account found:');
        console.log(fetchedAccount);
      }
  } catch (err) {
    console.log(err.message);
    console.log('Unable to fetch account.');
  }
}

function getAccounts(masterPassword) {
  var decryptedAccounts = [];
  var encryptedAccounts = storage.getItemSync('accounts');

  if (typeof encryptedAccounts !== 'undefined') {
    var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
    var decryptedAccounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }
  return decryptedAccounts;
}

function saveAccounts(accounts, masterPassword) {
  var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
  storage.setItemSync('accounts', encryptedAccounts.toString());
  return accounts;
}

function createAccount(account, masterPassword) {
  var accounts = getAccounts(masterPassword);
  console.log('createAccount.accounts: ' + accounts);
  accounts.push(account);
  saveAccounts(accounts, masterPassword);
  return account;
}

function getAccount(accountName, masterPassword) {
  var accounts = getAccounts(masterPassword);
  var matchedAccount;
  accounts.forEach(function(account) {
    if (account.name === accountName) {
      matchedAccount= account;
    }
  });
  return matchedAccount;
}



