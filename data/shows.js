const axios = require("axios");
const validate = require("../validation.js");

async function getShowById(showId) {
  showId = await validate.checkString(showId, "showID");
  let url = "http://api.tvmaze.com/shows/" + showId.toString();
  const { data } = await axios.get(url);
  if(Object.keys(data).length < 1)
    throw "There are no shows with that ID";
  return data;
}

async function getShowByName(showName) {
  showName = await validate.checkString(showName, "Show Name");
  let url = "http://api.tvmaze.com/search/shows?q=" + showName.toString()
  const {data} = await axios.get(url);  
  slicedArray = data;
  if(Object.keys(data).length > 5){
    slicedArray = data.slice(0, 5);
  }
  slicedArray = Object.assign({}, slicedArray);
  return slicedArray;
}

module.exports = {
  getShowById,
  getShowByName
};
