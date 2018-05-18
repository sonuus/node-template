var router = require('express').Router();

// api router will mount other routers
// for all our resources

router.use('/users', require('./user/userRoutes'))

router.use('/category', require('./category/categoryRoutes'))

router.use('/aws',require('./aws/awsRoutes'))

module.exports = router;
