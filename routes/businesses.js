const express = require('express');
const router = express.Router();
const data = require('../data');
const apiData = data.api;
const validate = require('../validation.js');

router.get('/', async(req, res) => {
    try{
        let title = "Explore Hoboken";
        let mainPage = "backgroundImg";
        res.render('display/finder', {mainPage: mainPage, title: title});
        res.status(200);

    } catch (e) {
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
    }
});

router.post('/searchactivities', async(req, res) => {
    try{
        let searchDetails = req.body.relevantSearchTerm;
        // searchDetails = await validate.checkString(searchDetails, "Search Term");
        let activities;
        //handle category selection
        switch(req.body.category) {
            case "food":
                activities = await apiData.searchFoodActivities(searchDetails);
                if(!searchDetails) resultsMsg = 'Browse Food'
                else resultsMsg = 'Results for: ' + searchDetails;
                break;
            case "entertainment":
                activities = await apiData.searchEntertainmentActivities(searchDetails);
                if(!searchDetails) resultsMsg = 'Browse Entertainment'
                else resultsMsg = 'Results for: ' + searchDetails;
                break;
            case "active":
                activities = await apiData.searchActiveActivities(searchDetails);
                if(!searchDetails) resultsMsg = 'Browse Activities'
                else resultsMsg = 'Results for: ' + searchDetails;
                break;
            case "nightlife":
                activities = await apiData.searchNightLifeActivities(searchDetails);
                if(!searchDetails) resultsMsg = 'Browse Nightlife'
                else resultsMsg = 'Results for: ' + searchDetails;
                break;
            default: //using default for all or if somehow select gets sent invalid data
                activities = await apiData.searchAllActivities(searchDetails);
                if(!searchDetails) resultsMsg = 'Browse All'
                else resultsMsg = 'Results for: ' + searchDetails;
    }
        let mainPage = "backgroundImg";
        res.render('display/found', {mainPage: mainPage, resultsMsg: resultsMsg, activities: activities, searchDetails: searchDetails, title: "Results"})
        res.status(200);

    } catch (e) {
        let title = "Explore Hoboken";
        let mainPage = "backgroundImg";
        res.render('display/finder', {mainPage: mainPage, title: title, error: e});
        res.status(404);
    }
});

router.get('/activity/:id', async(req, res) => {
    try {
        //need to error check

        let business = await apiData.getActivitiesById(req.params.id);
        business = fillEmptyData(business);
        let mainPage = "backgroundImg";
        res.render('display/businessDetails', {mainPage: mainPage, business: business, title: business.name});
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
  DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
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
