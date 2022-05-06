const axios = require("axios");
const validation = require("../validation.js");

/*
  Get an activity by its id
*/
async function getActivitiesById(id) {
  //  need to still error check, but not for empty spaces
  // id = await validation.checkString(id, "id");

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
  //console.log(result);
  return result;
}

/*
  Get all businesses by search name
*/
async function searchAllActivities(name) {
  //  need to still error check, but not for empty spaces
  // name = await validation.checkString(name, "'All' search term");

  //set header
  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };
  //build url
  const url = `https://api.yelp.com/v3/businesses/search?term=${name}&location=Hoboken`;

  let res = await axios.get(url, config); //get response
  let results = res.data.businesses; //get field from response

  return results;

}


/*
  Search activities by food
*/
async function searchFoodActivities(name) {
  //  need to still error check, but not for empty spaces
  // name = await validation.checkString(name, "'Food' search term");

  //set header
  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };

  //build url
  const url = `https://api.yelp.com/v3/businesses/search?term=${name}&categories=food&location=Hoboken`

  let res = await axios.get(url, config); //get response
  let results = res.data.businesses; //get field from response

  return results;
}


/*
  Search activities by Active Life
*/
async function searchActiveActivities(name) {
  //  need to still error check, but not for empty spaces
  // name = await validation.checkString(name, "'Active' search term");

  //set header
  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };

  //build url
  const url = `https://api.yelp.com/v3/businesses/search?term=${name}&categories=active&location=Hoboken`

  let res = await axios.get(url, config); //get response
  let results = res.data.businesses; //get field from response

  return results;
}


/*
  Search activities by Arts and Entertainment
*/
async function searchEntertainmentActivities(name) {
  //  need to still error check, but not for empty spaces
  // name = await validation.checkString(name, "'Arts and Entertainment' search term");

  //set header
  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };

  //build url
  const url = `https://api.yelp.com/v3/businesses/search?term=${name}&categories=arts&location=Hoboken`

  let res = await axios.get(url, config); //get response
  let results = res.data.businesses; //get field from response

  return results;
}


/*
  Search activities by Nightlife
*/
async function searchNightLifeActivities(name) {
  //  need to still error check, but not for empty spaces
  // name = await validation.checkString(name, "'Nightlife' search term");

  //set header
  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };

  //build url
  const url = `https://api.yelp.com/v3/businesses/search?term=${name}&categories=nightlife&location=Hoboken`

  let res = await axios.get(url, config); //get response
  let results = res.data.businesses; //get field from response

  return results;
}

module.exports = {
  getActivitiesById,
  searchAllActivities,
  searchFoodActivities,
  searchActiveActivities,
  searchEntertainmentActivities,
  searchNightLifeActivities
};
