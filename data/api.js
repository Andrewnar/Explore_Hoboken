const axios = require("axios");
const validate = require("../validation.js");

/*
  Get all businesses by search name
*/
async function getActivitiesByName(name) {
  name = await validate.checkString(name, "Name Parameter");

  //probably need validation here

  //set header
  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };
  //build url
  const url = `https://api.yelp.com/v3/businesses/search?term=${name}&latitude=40.745255&longitude=-74.034775`;

  let res = await axios.get(url, config); //get response
  let results = res.data.businesses; //get field from response

  return results;

}

/*
  Get an activity by its id
*/
async function getActivitiesById(id) {
  if(!id) throw 'no id provided.';

  //probably need validation here

  //set header
  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };
  //build url
  const url = `https://api.yelp.com/v3/businesses/${id}`;

  let res = await axios.get(url, config); //get response
  let result = res.data; //get field from response
  console.log(result);
  return result;
}

module.exports = {
  getActivitiesByName,
  getActivitiesById,
};
