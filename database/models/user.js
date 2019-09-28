const utils = require('../../utils/utils');

const userDB = {};
const userList = [];

userDB.add = ({ id, password, name }) => {
  userList.push({ id, password, name });
  return { id, password, name }
}

userDB.findByID = (id) => {
  return userList.find(user => user.id == id);
}

userDB.find = (user) => {
  const results = [];
  userList.forEach(item => {
    if (utils.hasSameValues(item, user))
      results.push(utils.cloneObject(item));
  });

  return results;
}

module.exports = userDB;