const express=require('express')
const { isAuthenticated, authorizedRoles } = require('../middleware/Auth')
const { getAllLaundryRequest, createLaundryRequest, deleterequest, updaterequest, getalllaudries, Updatlaundry, deletelaundry } = require('../Controllers/LaundryController')
const router=express.Router()


router.route('/fetchallrequests').get(isAuthenticated,getAllLaundryRequest)
router.route('/createrequest').post(isAuthenticated,createLaundryRequest)
router.route('/deleterequest/:id').delete(isAuthenticated,deleterequest)
router.route('/updaterequest/:id').put(isAuthenticated,updaterequest)

router.route('/admin/fetchallrequests').get(isAuthenticated,authorizedRoles, getalllaudries)
router.route('/admin/update/:id').put(isAuthenticated,authorizedRoles, Updatlaundry)
router.route('/admin/delete/:id').delete(isAuthenticated,authorizedRoles, deletelaundry)



module.exports=router;