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

router.post('/searchshows', async(req, res) => {
    try{
        let showDetails = req.body.showSearchTerm;
        showDetails = await validate.checkString(showDetails, "Show details");
        let shows = await apiData.getActivitiesByName(showDetails);
        //console.log(shows);
        res.render('display/found', {shows: shows, showDetails: showDetails, title: "Results"})
        res.status(200);

    } catch (e) {
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
    }
});

router.get('/show/:id', async(req, res) => {
    try{
        // await validate.checkString(req.params.id, "ID");
        console.log(req.params.id);
        let show = await apiData.getActivitiesById(req.params.id);
        console.log(show);
        // let sum = show.summary;
        //source for regexp: https://stackoverflow.com/questions/11229831/regular-expression-to-remove-html-tags-from-a-string
        // show.summary = sum.replace(new RegExp('<[^>]*>', 'g'), '')
        //res.render('display/showdetails', {show: show, title: 'Found'});
        res.status(200);

    } catch (e) {
        //console.log(e);
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
        
    }
});


module.exports = router;