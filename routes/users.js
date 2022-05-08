const express = require('express')
const router = express.Router()
const data = require("../data");
const userData = data.users;
const { ObjectId, CURSOR_FLAGS } = require("mongodb");


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

        res.render('usersRY/home');
    } catch (error) {
        res.status(404).json({ message: "Page not found" });
    }
});

router.get("/logsign", async(req, res) => {
    
    if(req.session.user){
        
        // alert("You have been loged in ")
        res.redirect('/')
    }else{
       
        try {
            
            res.render("usersRY/logsign");
            return;
        } catch (e) {
            res.status(404).json({ error: "Internal Error" });
            return;
        }
    }
})


router.post('/logsign', async(req, res) => {
    if ('signup' === req.body.formType) {
        let userInfo = req.body;
        try{
            if(typeof userInfo.username !== 'string') throw''
            
        }
        catch(e){

        }
        
        
        try {
            const newUser = await userData.createUser(
                userInfo.firstName,
                userInfo.lastName,
                userInfo.username,
                userInfo.email,
                userInfo.password
            );
            res.redirect("/logsign");
        } catch (e) {
            console.log(e);
            res.render("usersRY/error", {error : e});
            return;
        }
    } else if ('login' === req.body.formType) {
        try {
            let userInfo = req.body;
            let user = await userData.checkUser(userInfo.username, userInfo.password);
            req.session.user = { username: user.nickname.toLowerCase(), userId: user._id.toString() };
            return res.redirect("/");
        } catch (e) {
            console.log(e);
            return res.status(400).json({ error: e });
        }
    }
})


router.get('/logout', async(req, res) => {
    if(req.session.user){
        req.session.destroy();
        res.redirect("/");
    }else{
        res.redirect('/logsign')
    }


})


module.exports = router