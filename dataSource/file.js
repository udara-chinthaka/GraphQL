const user = require('../data.json');
const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

// user service
class UserService extends DataSource {
    constructor() {
        super();
    }

    // initialize(confi) { }

    getAllUser(args) {
        // use _ for filter from any data
        return _.filter(user, args);
    }
    getUserById(id) {
        return user.filter(function (user) {
            return user.id == id;
        });
    }
}

module.exports = UserService