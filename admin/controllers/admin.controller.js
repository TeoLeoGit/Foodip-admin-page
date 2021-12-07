const Admin = require('../models/admin.model');
const { multipleMongooseToObject} = require('../utils/mongooseUtil');


class AdminController {
    index(req, res, next) {
        if(req.isAuthenticated()) {
            Admin.loadAll()
                .then(admins => {
                    console.log(admins);
                    res.render('adminAccounts', { admins: multipleMongooseToObject(admins)})
                })
                .catch(next);
        }
        else   
            res.redirect('/login')
    }

}

module.exports = new AdminController();