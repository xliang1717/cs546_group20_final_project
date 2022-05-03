const express = require('express');
//const mongoCollections = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const userData = data.user;
const commentData= data.comment;
const validation = require('../validation');

router.get('/', async (req,res) => {
  try {
    
      let allusersDataList = await userData.getAll();
      res.status(200).json(allusersDataList);
  } catch(e) {
      res.status(500).json({error : e});
  }
});

router.get('/myprofile', async (req, res) => {
  try {
      res.render('pages/profile', { title: 'My Profile'});
  } catch (e) {
      res.status(500).json({ error: e });
  }
});

router.get('/:id', async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id,'id');
    let user = await userData.get(req.params.id);
    let commentlist = await commentData.getByUserId(req.params.id);
    let ID = req.params.id;

    
    res.render("pages/user", {title: "My Profile", userInfo: user, commentInfoList: commentlist, userId:ID});
  } catch (e) {
    res.status(404).json({ error: e });
    return;
  }
});




router.post('/myprofile', async (req, res) => {
  let userInfo = req.body;
  // try{
  //   if(Object.keys(req.body).length !== 6) throw "wrong number of inputs";
  // }
  // catch(e){
  //   return res.status(400).json({ error: e});
  // }
  req.session.user.userId="626dcbb98ce6dca27a55ea18";
  try {
    req.session.user.userId = validation.checkId(req.session.user.userId, 'ID');
    userInfo.nickname_input = validation.checkString(userInfo.nickname_input ,'username');
    userInfo.firstname_input  = validation.checkString(userInfo.firstname_input , 'firstName');
    userInfo.lastname_input  = validation.checkString(userInfo.lastname_input , 'lastName');
    userInfo.email_input  =  validation.checkString(userInfo.email_input ,'email');
    userInfo.password_input  =  validation.checkString(userInfo.password_input ,'password');
  
  } catch (e) {
    return res.status(400).render('pages/profile',{error: e});
  }

  try {
    await userData.get(req.session.user.userId);
  } catch (e) {
    return res.status(404).render('pages/profile',{error: 'User not found'});
  }


  try {
    await userData.updateUser(req.session.user.userId, userInfo.nickname_input,userInfo.firstname_input,userInfo.lastname_input, userInfo.email_input,userInfo.password_input);
    // res.status(200).render('pages/profile',{
    //   nickname: updatedUser.nickname,
    //   firstName: updatedUser.firstName,
    //   lastName: updatedUser.lastName,
    //   email: updatedUser.email,
    //   password: updatedUser.password
    // });
    res.status(200).render('pages/profile',{content:"Profile has been updated successfully."} );
  } catch (e) {
    res.render('pages/profile',{ error: e })
  }
});

// router.post('/addcar', async (req, res) => {
//   let car = req.body;
//   if(!car.carsize){
//     res.status(400).render("pages/myCar", {error: "You must provide a car size"});
//   return;}
//   try{
//     car.carsize = validation.checkString(car.carsize,"carsize");

//   }catch(e){
//     res.status(400).render("pages/myCar", {error: e});
//     return;
//   }

//   try{
//     let newCar = await userData.addCar(car.carsize);
//     if(newCar.userInserted == true){
//       res.render('pages/user',{title:"Add Car"});
//     }else{
//       res.status(500).json({ error: "Internal Server Error"});   
//     }
    
//   }catch(e){
//     res.status(400).render("pages/myCar", {error: e});
    
//   }
  

// })



module.exports = router;
