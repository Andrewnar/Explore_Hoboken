const axios = require("axios");
const validate = require("../validation.js");

async function getActivitiesByName(name) {
  name = await validate.checkString(name, "Name Parameter");

  var data = "";

  var config = {
    method: "get",
    url:
      "https://api.yelp.com/v3/businesses/search?term=" +
      name.toString() +
      "&latitude=40.745255&longitude=-74.034775",
    headers: {
      Authorization:
        "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx",
    },
    data: data,
  };

  let events = await axios(config);
  //console.log(JSON.stringify(events.data.businesses));
  return events.data.businesses;
}

async function getActivitiesById(id) {
  if(!id) throw 'No id inputted.'

  //probably need validation here

  const config = {
    headers: {
      Authorization: "Bearer rKIPRvkdBZMpPrV0HaZwJUD_4bCgykUYaArNXTZw313YUTn3xWUR4Vccl9XYHW5kI4ww6mPkcenLuFSEwS4OHRuIjvardJxfFLtsYPlaPQX5OiXLWhrJVADMFhJOYnYx"
    }
  };
  const url = `https://api.yelp.com/v3/businesses/${id}`;

  //
  //  THIS WILL NEED TO BE HANDLED BETTER WITH ERROR CHECKING ETC...
  //

  let result;

  await axios.get(url, config)
    .then(res => {
      //console.log(res.data);
      result = res.data;
    })
    .catch(err => {
      console.log(err);
      result = {error: 'botched'}; //wrong way to error check, will fix
    })
    return result;

}

module.exports = {
  getActivitiesByName,
  getActivitiesById,
};
