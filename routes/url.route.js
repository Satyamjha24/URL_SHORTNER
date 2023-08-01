const express = require('express');
const { URLModel } = require('../models/url.model')
const { generateNewShortURL, handleAnalytics } = require('../controllers/url.controller')

const urlRouter = express.Router();

urlRouter.post('/', generateNewShortURL)


urlRouter.get('/:id', async (req, res) => {

    const { id } = req.params;
    const time = Date.now()
    const currentDate = new Date(time)

    const data = await URLModel.findOneAndUpdate({ shortId: id }, { $push: { visitHistory: { timestamp: currentDate } } })

    res.redirect(data.redirectURL)

})


urlRouter.get('/analytics/:id', handleAnalytics)


module.exports = {
    urlRouter
}