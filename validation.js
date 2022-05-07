const { ObjectId } = require('mongodb');

module.exports = {
  checkId(id, varName) {
    if (!id) throw ` You must provide a ${varName}`;
    if (typeof id !== 'string') throw ` ${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw ` ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw ` ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw ` You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw ` ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw ` ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw ` ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    let arrayInvalidFlag = false;
    if (arr.length === 0) throw `The ${varName} at least contain one valide element !`
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      arr[i] = arr[i].trim();
    }
    if (arrayInvalidFlag)
      throw `One or more elements in ${varName} array is not a string or is an empty string`;
    return arr;
  },




  checkValidDate(releaseDate, varName) {
    if (!releaseDate) throw `There need ${varName}.`
    if (typeof releaseDate !== 'string') throw `The ${varName} must be a string`;
    releaseDate = releaseDate.trim();
    if (releaseDate.length === 0) throw `${varName} cannot be an empty string or string with just spaces`;

    let r = releaseDate.match(/^(\d{2})(\/)(\d{2})\2(\d{4})$/);
    if (r == null) throw `The ${varName}'s format must be 'MM/DD/YYYY' `;

    let d = new Date(r[4], r[1] - 1, r[3]);
    let currentDate = new Date;

    if (r[4] < 1900 || r[4] > currentDate.getFullYear()) throw `The ${varName} is invalide`;
    if (d.getMonth() + 1 != r[1] || d.getDate() != r[3]) throw `The ${varName}'s Month or day is invalide `;

    return releaseDate;
  },

  checkRate(rating, varName) {
    if (!rating) throw `There need ${varName}`
    if (typeof rating !== 'number') throw `${varName} must be a number`;
    if (rating < 1 || rating > 5) throw `${varName} out of the range`;
    if (rating % 1 !== 0) {
      rating = Math.round(rating * 10) / 10;
    };
    return rating;
  },

  checkEmail(email, varName) {
    if (!email) throw 'Need to provide an email';
    if (typeof email !== 'string') throw 'Need to provide a string';
    email = email.trim();
    if (email.length === 0) throw 'provided variable is just empty spaces';
    if (!email.includes('.')) {
      throw 'provided variable does not contain a dot';
    }
    if (!email.includes('@')) {
      throw 'Please provide a valid email';
    }

    var lastDotIndex = email.lastIndexOf('.');
    var sub = email.substring(lastDotIndex + 1);
    var count = 0;
    var reg = /^[A-Za-z]+$/;
    for (let i = 0; i < sub.length; i++) {
      if (reg.test(sub[i])) {
        count++;
      }
    }
    if (count < 2) throw 'provided variable does not have at LEAST 2 LETTERS after the dot';
    if (email.charAt(0) === '.') throw 'provided variable should contain domain name';
    return email;
  },
  
  checkIntNumber(num, varName){
    if (!num) throw `There need ${varName}`;
    if(typeof num === 'boolean') throw `${varName} must be a number`
    num = Number(num);
    if (typeof num !== 'number' || isNaN(num)) throw `${varName} must be a number`;
    if (num % 1 !== 0){
      throw `${varName} must be a Int number`
    };
    return num;
  } 

};