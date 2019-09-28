const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../database/connect');
const utils = require('../utils/utils');
const wrapper = require('../utils/wrapper');

const router = express.Router();

router.get('/', (req, res) => {
  const { id, name } = req.query;
  const dbQuery = utils.removeEmptyValues({ id, name });

  const results = db.user.find(dbQuery);
  res.json(utils.successTrue(results));
});

router.post('/', wrapper.asyncTrycatch(async (req, res) => {
  const { id, password, name } = req.body;
  const round = parseInt(process.env.SALT_ROUND);
  const salt = await bcrypt.genSalt(round);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = db.user.add({ id, password: hashedPassword, name });
  res.json(utils.successTrue(result));
}));

module.exports = router;
