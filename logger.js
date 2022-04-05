/*
logger.info = (...args) => console.log(chalk.green(timestamp()), ...args);
logger.warn = (...args) => console.log(chalk.yellow(timestamp()), ...args);
logger.critical = (...args) => console.log(chalk.red(timestamp()), ...args);
logger.command = (user, msg) =>	console.log(chalk.magenta(timestamp()), `${user.tag} (${user.id}) - ${chalk.bold(msg)}`);
*/

const chalk = require('chalk');
const moment = require('moment-timezone');

moment().tz('Europe/Moscow');
const _log = (color, ...args) => console.log(color(moment().format()), ...args);

const log = {};
log.info = (...args) => _log(chalk.green, ...args);
log.warn = (...args) => _log(chalk.yellow, ...args);
log.error = (...args) => _log(chalk.red, ...args);
log.command = (user, msg) => _log(chalk.cyan, `${user.tag} (${user.id}) - ${chalk.bold(msg)}`);

module.exports = log;
