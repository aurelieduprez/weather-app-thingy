const router = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req,res) => {

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Cet email a déjà un compte.');

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.send({user: user._id})
    }
    catch (err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send("Cet email n'est pas enregistré.");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Wrong Password");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN);
    res.header('auth-token', token).send(token);
    
});

module.exports = router;