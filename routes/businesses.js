const express = require('express');
const router = express.Router();
const data = require('../data');
const apiData = data.api;
const validate = require('../validation.js');

router.get('/', async(req, res) => {
    try{
        let title = "Explore Hoboken";
        res.render('display/finder', {title: title});
        res.status(200);

    } catch (e) {
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
    }
});

router.post('/searchactivities', async(req, res) => {
    try{
        let searchDetails = req.body.relevantSearchTerm;
        searchDetails = await validate.checkString(searchDetails, "Show details");

        let activities;
        //handle category selection
        switch(req.body.category) {
            case "food":
                activities = await apiData.searchFoodActivities(searchDetails);
                break;
            case "entertainment":
                activities = await apiData.searchEntertainmentActivities(searchDetails);
                break;
            case "active":
                activities = await apiData.searchActiveActivities(searchDetails);
                break;
            case "nightlife":
                activities = await apiData.searchNightLifeActivities(searchDetails);
                break;
            default: //using default for all or if somehow select gets sent invalid data
                activities = await apiData.searchAllActivities(searchDetails);
        }

        res.render('display/found', {activities: activities, searchDetails: searchDetails, title: "Results"})
        res.status(200);

    } catch (e) {
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
    }
});

router.get('/activity/:id', async(req, res) => {
    try {
        //need to error check

        let business = await apiData.getActivitiesById(req.params.id);
        business = fillEmptyData(business);
        res.render('display/businessDetails', {business: business, title: business.name});
        res.status(200);

    } catch (e) {
        //console.log(e);
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);

    }
});

function fillEmptyData(business){
  // console.log(business.hours[0]["open"]);

  if(!business.hours){
      return business;
  }
  DAYS = ["M","T","W","TH","F","SA  ","S"]
  HOURS = [];
  for (let i=0; i<business.hours[0]["open"].length;i++){
    info = business.hours[0]["open"][i];
    info["start"] = info["start"].slice(0,2) + ":" + info["start"].slice(2,4);
    info["end"] = info["end"].slice(0,2) + ":" + info["end"].slice(2,4);
    DAY = {"start":info["start"],"end":info["end"],day:DAYS[info["day"]]}
    HOURS.push(DAY);
  }
  business["HOURS"] = HOURS;


  business.price = business.price ? business.price : "N/A"
  // business.HOURS = business.HOURS.length ? business.HOURS : "N/A"
  business.display_phone = business.display_phone ? business.display_phone : "N/A"
  business.rating = business.rating ? business.rating : "N/A"
  // business.categories = business.categories.length ? business.categories : [{"title":"N/A"}]


  return business;
}

module.exports = router;
