'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { Task } = require('./task');

const UserSchema = new Schema({
  displayName: { type: String },
  googleId: { type: String, required: true },
  accessToken: { type: String, required: true },
  mission: {type: String},
  roles: [
    {
      role: {type: String, default: 'no assigned role'},
      goals: [
        {
          goal: {type: String, default: 'no assigned goal' },
          tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'task'}]
        }
      ]
    }
  ]
});

UserSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    displayName: this.displayName,
    mission: this.mission,
    googleId: this.googleId,
    roles: this.roles
  };
};

const User = mongoose.model('user', UserSchema);

module.exports = { User };