const {Thought, User} = require('../models'); 

const thoughtsController = {
    async getAllThoughts(req, res) {
    try {
        const thoughtData = await Thought.find().select('-__v');
        res.json(thoughtData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};   