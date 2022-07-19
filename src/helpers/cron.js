const cron = require("node-cron");
const startSchedule = (cronFields, func, args) => {
    return cron.schedule(cronFields, async () => await func(args));
};

module.exports = {startSchedule}