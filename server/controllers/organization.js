const OrganizationModel = require('../../db/schemas/organization').OrganizationModel;


exports.createOrganization = (req, res, next) => {
    console.log(req.body.name);
    OrganizationModel.create({ name: req.body.name }).then(newOrg => {
        console.log(newOrg);
        res.status(200).send({
            success: true
        });
    }).catch(e => {
        res.status(400).send({
            success: false,
            errors: e.errors
        });
    });
};