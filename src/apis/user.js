import { User } from '../modals/User.js'
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs"
import nodemailer from "nodemailer"
import { configMail, configPass } from '../config.js';



const transporter = nodemailer.createTransport({ service: "gmail", auth: { user:"workspatron@gmail.com" , pass:configPass }, from: "workspatron@gmail.com" })
transporter.verify((err, succ) => {
    if (err) {
        console.log(err);
    } else if (succ) {
        console.log("Mail Service Connected");
    }
});


export const userSignup = (req, res) => {
    const { name, email } = req.body
    if (!name || !email) {
        return res.status(422).json({ error: "please fill all fields " })
    }
    User.findOne({ email: email })
        .then((responce) => {
            if (responce) {
                return res.status(422).json({ message: 'already registered' })
            }
            const password = Math.random().toString(36).slice(-8);
            bycrypt.hash(password, 12)
                .then((hashedpassword) => {
                    const Data = { name, email, password: hashedpassword }
                    const user = new User(Data)
                    user.save()
                        .then(user => {
                            transporter.sendMail({
                                to: user.email,
                                subject: "Register Email",
                                html: `
                            <h1>Well Come to Cars List</h1>  
                            <h5>Your password is</h5>
                            <h5>${password}</h5>
                            `
                            })
                            res.json({ message: "please check your email" })

                        })
                })
        }).catch((err) => {
            console.log(err)
        })

}

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please fill the field" })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: "email not register" });
    }
    bycrypt.compare(password, user.password)
        .then(doMatch => {
            if (doMatch) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                user.password = undefined
                res.json({ message: "Successfull Login", token, user })
            } else {
                return res.status(422).json({ error: 'invalid password' })
            }
        })
}








