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
        let activities = await apiData.getActivitiesByName(searchDetails);
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
        res.render('display/businessDetails', {business: business, title: business.name});
        res.status(200);

    } catch (e) {
        //console.log(e);
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
        
    }
});


module.exports = router;