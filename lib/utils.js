const log = console.log;
const uniqueId = () => {
    return Math.floor(Math.random() * Date.now());
};

module.exports = { log, uniqueId };