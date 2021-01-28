const { format } = require('timeago.js');
const helpers = {};

helpers.timeago = (timeStamp) => {
    return format(timeStamp);
}

const bcrypt = require('bcryptjs');

helpers.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10); //Encryptando el password
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

helpers.matchPassword = async (plainText, password) => { return await bcrypt.compare(plainText, password) }


module.exports = helpers;


