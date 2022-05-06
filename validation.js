const {ObjectId} = require('mongodb');

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


//   checkYear (yearFormed, varName) {
//     if (!yearFormed) throw`There need ${varName}.`
//     if (typeof yearFormed !== "number") {
//       throw `${varName} must be a number`
//     }

//     if (isNaN(yearFormed)) {
//       throw ' NaN is invalid, there must be a number!'
//     }

//     if (yearFormed % 1 !== 0) throw "The year formed must be an integer !"
//     if ( yearFormed < 1900 || yearFormed > 2022 ) {
//       throw "The year formed of this band must between 1900 ~ 2022 !"
//     }

//     return yearFormed;
//   },
  

  // checkValidDate(releaseDate, varName) {
  //   if (!releaseDate) throw`There need ${varName}.`
  //   if (typeof releaseDate !== 'string') throw `The ${varName} must be a string`;
  //   releaseDate = releaseDate.trim();
  //   if (releaseDate.length === 0) throw `${varName} cannot be an empty string or string with just spaces`;

  //   let r = releaseDate.match(/^(\d{2})(\/)(\d{2})\2(\d{4})$/);
  //   if (r == null) throw `The ${varName}'s format must be 'MM/DD/YYYY' ` ;
    
  //   let d = new Date(r[4], r[1]-1,r[3]);
  //   let currentDate = new Date;

  //   if ( r[4]< 1900 || r[4] > currentDate.getFullYear()) throw `The ${varName} is invalide`;
  //   if ( d.getMonth() + 1 != r[1] || d.getDate() != r[3]) throw `The ${varName}'s Month or day is invalide `; 

  //   return releaseDate;
  // },

  checkRate(rating, varName) {
    if (!rating) throw `There need ${varName}`;
    if(typeof rating === 'boolean') throw `${varName} must be a number`
    rating = Number(rating);
    if (typeof rating !== 'number' || isNaN(rating)) throw `${varName} must be a number`;
    if (rating < 1 || rating > 5) throw `${varName} out of the range`;
    if (rating % 1 !== 0) {
      rating = Math.round(rating*10)/10;
    };
    return rating;
  },

  checkIntNumber(num, varName){
    if (!num) throw `There need ${varName}`;
    if(typeof num === 'boolean') throw `${varName} must be a number`
    num = Number(num);
    if (typeof num !== 'number' || isNaN(num)) throw `${varName} must be a number`;
    if (num % 1 !== 0){
      throw `${varName} must be a Int number`
    }
  }


  

};