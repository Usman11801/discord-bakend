const express = require('express');
const router = express.Router();
const Review = require('../models/ReviewSchema'); // Your Review model

// POST route for adding a review
router.post('/review', async (req, res) => {
  console.log("POST /review hit"); // Debug log
  console.log("Request Body:", req.body); // Log request body

  const { productId, userId, rating } = req.body;

  if (!rating || rating > 5 || rating < 1) {
    return res.status(400).json({ msg: 'Invalid rating or comment' });
  }

  try {
    const review = new Review({
      productId,
      userId,
      rating,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET route for fetching all reviews
router.get('/reviews', async (req, res) => {
  console.log("GET /reviews hit"); // Debug log

  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
