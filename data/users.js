const bcrypt = require('bcrypt');
const { user } = require('../config/mongoCollections');
const { ObjectId } = require("mongodb");
const saltRounds = 16;



async function get(username) {
    const userCollection = await user();
    username = username.toLowerCase();
    const userr = await userCollection.findOne({
        nickname: username,
    });
    return userr;
}

function validateID(id) {
    if (typeof id != "string") {
        throw "Argument of type string expected";
    }
    if (id.trim().length === 0) {
        throw "String cannot be blanks or empty";
    }
    if (!ObjectId.isValid(id)) {
        throw "Object Id is not valid";
    }
}

function checkIsProperString(val) {
    if (!val) {
        throw `No input passed`;
    }
    if (typeof val !== "string") {
        throw `Not a string`;
    }

    if (val.length == 0) {
        throw `Length of string is 0`;
    }
    if (val.trim().length == 0) {
        throw `String is only spaces`;
    }
}

function checkParameters() {
    throw "Expected arguments not found";
}


let exportedMethods = {
    async createUser(firstName, lastName, username, email, password) {

        if (!firstName || !lastName || !username || !email || !password) {
            throw "Missing paarameter"
        }


        username = username.toLowerCase();

        checkIsProperString(firstName);
        checkIsProperString(lastName);
        checkIsProperString(username);
        checkIsProperString(password);

        if (typeof(username) !== 'string' || username.trim().length === 0 || username.indexOf(' ') >= 0 || /[^A-Za-z0-9]/g.test(username) || username.length < 4) {
            throw "Error: username is inappropriate, must be at least 4 characters long and must not include spaces and only alphanumeric characters"
        }
        if (typeof(password) !== 'string' || password.trim().length === 0 || password.indexOf(' ') >= 0 || password.length < 6) {
            throw "Error: password is inappropriate, must be at least 6 characters long and must not include spaces"
        }
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(email)) {
            throw `Incorrect email format`;
        }

        const userr = await get(username);

        if(userr) throw 'The username hase been created';

        pwd = await bcrypt.hash(password, saltRounds);
        let newUser = {
            isDelete: false,
            firstName: firstName,
            lastName: lastName,
            nickname: username,
            email: email,
            password: pwd,
            comment : [],
            preferLocation:[],
            carsize:[],
            collectionCarParks:[],
            addedCarParks:[],
            carParkingLocation:'',
            myCar:[]
        };
        const userCollection = await user();
        const userInfo = await userCollection.insertOne(newUser)
            // .catch(function(e) { throw "Username already exists"; });
        if (userInfo.insertedCount === 0) { throw 'Could not add new user'; }
        console.log(userInfo)
        return userInfo.insertedId.toString();
    },


    async getUser(id = checkParameters()) {
        id = id.trim();
        id = ObjectId(id);

        const userCollection = await user();
        const userId = await userCollection.findOne({ _id: id });
        if (userId === null) throw "No user found";
        userId._id = userId._id.toString();

        return userId;
    },
    async checkUser(username, password) {
        username = username.toLowerCase()
        checkIsProperString(username);
        if (!username) {
            alert("No Input Username");
        }
        if (!password) {
            alert("No Input Password");
        }
        if (typeof username != "string" || typeof password != "string")
            throw "Error: Username or password must be string";
        if (username.trim().length === 0) {
            alert("String is only spaces");
        }
        if (username.length == 0) {
            alert("Length of string is 0");
        }
        if (username.length < 4 || username.length > 16) {
            alert("Username length should be 4-16 characters");
        }
        if (username.indexOf(' ') >= 0 || /[^A-Za-z0-9]/g.test(username)) {
            alert("Error: username is inappropriate, must not include spaces and only alphanumeric characters");
        }

        checkIsProperString(password);
        if (password.trim().length === 0 || password.length < 6)
            throw "Error: Password cannot be blanks or length should be atleast 6 chars long";
        if (/\s/.test(password)) throw "Error: Password cannot contain spaces";

        let user = await get(username)
        if (user === null) {
            throw "Username not found"
        }
        const hash = user.password;
        const match = await bcrypt.compare(password, hash);
        if (match === true) {
            return user;
        } else {
            throw "Incorrect Password"
        }
    }
}

module.exports = exportedMethods;