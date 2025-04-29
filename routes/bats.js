const express = require('express');
const router = express.Router();
const Bat = require('../models/bat');
const { isLoggedIn } = require('../middleware');

// Index route
router.get('/', async (req, res) => {
    const bats = await Bat.find({});
    res.render('bats/index', { bats });
});

// New route
router.get('/new', isLoggedIn, (req, res) => {
    res.render('bats/new');
});

// Create route
router.post('/', isLoggedIn, async (req, res) => {
    const bat = new Bat(req.body.bat);
    bat.author = req.user._id;
    await bat.save();
    res.redirect(`/bats/${bat._id}`);
});

// Show route
router.get('/:id', async (req, res) => {
    const bat = await Bat.findById(req.params.id).populate('author');
    res.render('bats/show', { bat });
});

// Edit route
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const bat = await Bat.findById(req.params.id);
    res.render('bats/edit', { bat });
});

// Update route
router.put('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const bat = await Bat.findByIdAndUpdate(id, { ...req.body.bat });
    res.redirect(`/bats/${bat._id}`);
});

// Delete route
router.delete('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await Bat.findByIdAndDelete(id);
    res.redirect('/bats');
});

module.exports = router; 