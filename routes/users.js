const express = require('express')
const router = express.Router()
const data = require("../data");
const userData = data.users;
const { ObjectId, CURSOR_FLAGS } = require("mongodb");
const xss = require('xss');


function validate(id) {
    if (typeof id != "string") {
        return false;
    } else if (id.trim().length === 0) {
        return false;
    } else if (!ObjectId.isValid(id)) {
        return false;
    } else return true;
}

router.get("/", (req, res) => {
    try {

        res.render('usersRY/home', { title: "Home" });
    } catch (error) {
        res.status(404).json({ message: "Page not found" });
    }
});

router.get("/logsign", async(req, res) => {

    if (req.session.user) {

        // alert("You have been loged in ")
        res.redirect('/')
    } else {

        try {

            res.render("usersRY/logsign", { title: "Logsign" });
            return;
        } catch (e) {
            res.status(404).json({ error: "Internal Error" });
            return;
            yield
        }
    }
});

router.get('/checkAuthen', async(req, res) => {
    if (!req.session.user) {
        return res.redirect("/logsign");
    }
    try {
        res.redirect('/myCollection/' + req.session.user.userId);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/checkAuthentocomment', async(req, res) => {
    if (!req.session.user) {
        return res.redirect("/logsign");
    }
    try {
        res.redirect('/myComments/' + req.session.user.userId);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


router.post('/logsign', async(req, res) => {
    if ('signup' === req.body.formType) {
        let userInfo = req.body;
        try {
            if (!userInfo.username2) {
                throw "No Input Username";
            }
            if (!userInfo.password2) {
                throw "No Input Password";
            }
            if (typeof userInfo.username2 != "string" || typeof userInfo.password2 != "string")
                throw "Error: Username or password must be string";
            if (userInfo.username2.trim().length === 0) {
                throw "String is only spaces";
            }
            if (userInfo.username2.length == 0) {
                throw "Length of string is 0";
            }
            if (userInfo.username2.length < 4 || userInfo.username2.length > 16) {
                throw "Username length should be 4-16 characters";
            }
            if (userInfo.username2.indexOf(' ') >= 0 || /[^A-Za-z0-9]/g.test(userInfo.username)) {
                throw "Error: username is inappropriate, must not include spaces and only alphanumeric characters";
            }
            if (userInfo.password2.trim().length === 0 || userInfo.password2.length < 6)
                throw "Error: Password cannot be blanks or length should be atleast 6 chars long";
            if (/\s/.test(userInfo.password2)) throw "Error: Password cannot contain spaces";
        } catch (e) {
            console.log(e);
            res.render("usersRY/error", { error: e });
            return;
        }


        try {
            const newUser = await userData.createUser(
                xss(userInfo.firstName),
                xss(userInfo.lastName),
                xss(userInfo.username2),
                xss(userInfo.email),
                xss(userInfo.password2)
            );
            res.redirect("/logsign");
        } catch (e) {
            console.log(e);
            res.render("usersRY/error", { error: e });
            return;
        }
    } else if ('login' === req.body.formType) {
        try {
            let userInfo = req.body;
            let user = await userData.checkUser(xss(userInfo.username), xss(userInfo.password));
            req.session.user = { username: user.nickname.toLowerCase(), userId: user._id.toString() };
            return res.redirect("/");
        } catch (e) {
            console.log(e);

            res.render("usersRY/error", { error: e });
        }
    }
})


router.get('/logout', async(req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.redirect("/");
    } else {
        res.redirect('/logsign')
    }


})


module.exports = router