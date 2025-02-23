const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: String
});
//create model
const Userlogin = mongoose.model("username",userShema);
module.exports = Userlogin;

