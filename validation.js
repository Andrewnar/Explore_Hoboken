async function checkString(str, par) {
    str = str.trim();
    if(!str || str === undefined || typeof str !== "string") throw `${par} must exist and be a string.`;
    if(str.replace(/\s/g, '').length === 0) throw  `${par} must have character count > 0`;
    return str;
}

async function checkStringInArr(str, par) {
    if(!str || str === undefined || typeof str !== "string") throw `All variables in array, ${par}, must exist and be a string`;
    if(str.replace(/\s/g, '').length === 0) throw `All variables in array, ${par}, must have character count > 0`;
    return;
}

async function checkArr(arr, par) {
    if(!Array.isArray(arr) || arr == undefined) 
        throw `${arr | "Variable"} is not an array or is undefined for ${par}`;
    if(arr.length < 1)
        throw `Array is empty for ${par}`;
    for(const element of arr){
        await checkStringInArr(element);
    }
}

async function checkYear(num){
    if(typeof num !== 'number' || isNaN(num)) throw `${num || 'yearFormed'} is not a valid number`;
    if(num < 1900 || num > 2022) throw `${num || 'yearFormed'} must be between 1900-2022`;
    return;
}

async function checkWebsite(str){
    str = str.trim();
    if(!(str.substring(0,11).toLowerCase() === "http://www.") || !(str.substring(str.length - 4).toLowerCase() === ".com"))
        throw "website must include 'http://www.' and have '.com' be the last four characters"
    if(str.length < 20) throw "website url must have atelast 5 characters between 'www.' and '.com'."
    return str;
}

module.exports = {
    checkString,
    checkStringInArr,
    checkArr,
    checkYear,
    checkWebsite,
};
