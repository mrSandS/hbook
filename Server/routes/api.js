const express = require('express');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
	let data = {};

	const {
	  name,
	  _id,
	  email
	} = req.user;

	data.user = {
		name,
		_id,
		email
	};
	data.success = true;
	res.json(data)
});

module.exports = router;