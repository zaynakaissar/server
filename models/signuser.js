const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userShema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
      },
    password: {
        type: String,
        required: true,
        minlength:8,
      },
    passwordconf: {
        type: String,
        required: true,
      }

});
userShema.pre('save',async function(next) {
    if(!this.isModified('password')){
        return next();}
    if(this.password !== this.passwordconf){
        return next(new Error("كلمات المرور غير متطابقة "));
    }
    const Salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,Salt);
    this.passwordconf = this.password;
    next()
})
 const User = mongoose.model('User',userShema)
 module.exports = User;
