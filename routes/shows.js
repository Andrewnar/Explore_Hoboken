const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;
const validate = require('../validation.js');

router.get('/', async(req, res) => {
    try{
        let title = "Show Finder";
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
        let shows = await showData.getActivitiesByName(showDetails);
        console.log(shows);
        res.render('display/found', {shows: shows, showDetails: showDetails, title: "Shows Found"})
        res.status(200);

    } catch (e) {
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
    }
});

router.get('/show/:id', async(req, res) => {
    try{
        await validate.checkString(req.params.id, "ID");
        let show = await showData.getShowById(req.params.id);
        let sum = show.summary;
        //source for regexp: https://stackoverflow.com/questions/11229831/regular-expression-to-remove-html-tags-from-a-string
        show.summary = sum.replace(new RegExp('<[^>]*>', 'g'), '')
        res.render('display/showDetails', {show: show, title: show.name});
        res.status(200);

    } catch (e) {
        //console.log(e);
        res.render('display/error', {error: e, title: "ERROR PAGE"});
        res.status(404);
        
    }
});


module.exports = router;