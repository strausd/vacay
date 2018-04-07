const OrganizationModel = require('../../db/schemas/organization').OrganizationModel;
const UserModel = require('../../db/schemas/user').UserModel;


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
            errors: e.errors,
            e
        });
    });
};


exports.testConnection = (req, res, next) => {
    const org_id = req.params.org_id;
    const user_id = req.params.user_id;
    OrganizationModel.findById(org_id).populate('members').then(org => {
        // return UserModel.findByIdAndUpdate(user_id, { organization: org._id }, { new: true }).populate('organization');
        console.log(org.members);
        return res.status(200).send({
            success: true,
            org,
            members: org.members
        });
    }).catch((e) => {
        res.status(400).send({
            success: false,
            errors: e.errors,
            e
        });
    });
};

// exports.testConnection = (req, res, next) => {
//     const org_id = req.params.org_id;
//     const user_id = req.params.user_id;
//     OrganizationModel.findById(org_id).then(org => {
//         return UserModel.findByIdAndUpdate(user_id, { organization: org._id }, { new: true }).populate('organization');
//     }).then(user => {
//         res.status(200).send({
//             success: true,
//             user,
//         });
//     }).catch((e) => {
//         res.status(400).send({
//             success: false,
//             errors: e.errors,
//             e
//         });
//     });    
// };