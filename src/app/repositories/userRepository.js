const User = require('../models/userModel');

exports.create = async function (newUser) {
    return await User.create(newUser);
}

exports.findByMail = async function (email, selectAttributes) {
    return await User.findOne({ email }).select(selectAttributes);
}

exports.findAll = async function () {
    return await User.find();
}

exports.findAll = async function () {
    return await User.find();
}

exports.findById = async function (id) {
    return await User.findById(id);
}

exports.findByIdAndRemove = async function (id) {
    return await User.findByIdAndRemove(id);
}

exports.findByIdAndUpdate = async function (id, newUser, actionsJson) {
    return await User.findByIdAndUpdate(id, newUser, actionsJson);
}