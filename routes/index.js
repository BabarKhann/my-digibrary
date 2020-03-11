const router = require('express').Router();
// const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;