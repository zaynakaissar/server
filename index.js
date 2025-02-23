const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/signuser.js')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(express.json()); // لقراءة بيانات JSON المرسلة من الصفحة
mongoose.connect("mongodb+srv://zaynabkaissar:iz80E7AgLYHSuOpT@cluster0.co90r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("connected to MongoDB"))
.catch(err=>console.log("Mongo connection error:",err));

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try{
        const findUser = await User.findOne({email});
        if(!findUser){
            res.status(400).json({message: "خطأ في كلمة المرور أو الايميل " })
        }
        else{
            const ismatch =await bcrypt.compare(password,findUser.password);
            if(ismatch){
                res.json({message: "ثم تسجيل الدخول بنجاح"});
            }
            else{
                res.status(400).json({message: "خطأ في كلمة المرور أو الايميل " })
            }
        }

    }catch(err){
        console.error("error signing user!",err);
        res.status(500).json({message:"Error signing user.",Error: err.message});}
    })
    app.post("/register",async(req,res)=>{
        try{
            const {email, password, passwordconf} = req.body;
            const findUser = await User.findOne({email}) ;
            if(findUser){
                res.json({message: "خطأ في كلمة المرور أو الايميل "})
            }
            else{
                const newUser = new User ({email, password, passwordconf});
                await newUser.save();
                res.json({message: "تم تسجيل المستخدم بنجاح انتقل الى تسجيل الدخول"});
            }
        }catch(err){
            console.error("error registring user!",err);
            res.status(500).json({message:"Error registring user.",Error: err.message});}

    })
    app.get('/register', async (req, res) => {
        const userdata =await User.find()
        res.json(userdata);
    })
    app.delete('/signup/:id', async (req, res) => {
        const id = req.params.id;
        const userdata = await User.findByIdAndDelete(id);
        res.status(200).json(userdata)
    })
// تشغيل الخادم على المنفذ 3000
app.listen(3001, () => {
    console.log('I am listening in port 3001 !');
});






