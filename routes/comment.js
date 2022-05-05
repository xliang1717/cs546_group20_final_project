const express = require('express');
const router = express.Router();

router.delete('/usercomment', async (req, res) => {
  res.json("aaa")

})

module.exports = router;