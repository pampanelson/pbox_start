var utils = {};
utils.setClientID = function(that) {
    that.id = window.location.href.split("=")[1];
}
module.exports = utils;