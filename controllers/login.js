const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

loginRouter.get('/', async (req, res) => {
  const login = await User.find({});
  res.json(login);
});

loginRouter.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
  });

  const result = await user.save();
  res.status(201).json(result);
});

// loginRouter.delete('/:id', async (req, res) => {
//   const result = await User.findByIdAndDelete(req.params.id);
//   res.status(200).json(result);
// });

// loginRouter.put('/:id', async (req, res) => {
//   const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (result) {
//     return res.status(200).json(result);
//   }
//   return res.status(404).end();
// });

module.exports = loginRouter;
