const Framework = require('../models/framework.model.js');

// Create and Save a new framework
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "framework content can not be empty"
        });
    }

    // Create a framework    
    const framework = new Framework({
        name: req.body.name || "Untitled framework", 
        description: req.body.description,
        type: req.body.type
    });

    // Save framework in the database
    framework.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the framework."
        });
    });
};


// Retrieve and return all frameworks from the database.
exports.findAll = (req, res) => {
    Framework.find()
    .then(frameworks => {
        res.send(frameworks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving frameworks."
        });
    });
};

// Find a single framework with a frameworkId
exports.findOne = (req, res) => {
    Framework.findById(req.params.frameworkId)
    .then(framework => {
        if(!framework) {
            return res.status(404).send({
                message: "framework not found with id " + req.params.frameworkId
            });            
        }
        res.send(framework);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "framework not found with id " + req.params.frameworkId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving framework with id " + req.params.frameworkId
        });
    });
};

// Update a framework identified by the frameworkId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "framework content can not be empty"
        });
    }

    // Find framework and update it with the request body
    Framework.findByIdAndUpdate(req.params.frameworkId, {
        name: req.body.name || "Untitled framework", 
        description: req.body.description,
        type: req.body.type
    }, {new: true})
    .then(framework => {
        if(!framework) {
            return res.status(404).send({
                message: "framework not found with id " + req.params.frameworkId
            });
        }
        res.send(framework);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "framework not found with id " + req.params.frameworkId
            });                
        }
        return res.status(500).send({
            message: "Error updating framework with id " + req.params.frameworkId
        });
    });
};

// Delete a framework with the specified frameworkId in the request
exports.delete = (req, res) => {
    Framework.findByIdAndRemove(req.params.frameworkId)
    .then(framework => {
        if(!framework) {
            return res.status(404).send({
                message: "framework not found with id " + req.params.frameworkId
            });
        }
        res.send({message: "framework deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "framework not found with id " + req.params.frameworkId
            });                
        }
        return res.status(500).send({
            message: "Could not delete framework with id " + req.params.frameworkId
        });
    });
};