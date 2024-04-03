const {User, Thought} = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
            .select('-__v')
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
            !userData ? res.status(404).json({ message: 'No user found with this id!' }) 
            : res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async createUser(req, res) {
        try{
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteUser (req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.id });
            !userData ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                {runValidators: true, new: true}
            )
            !userData ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(userData);
        }   catch (err) {
            res.status(400).json(err);
        } 
    },

    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            )
            !userData ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )
            !userData ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(userData);
        } catch (err) {
            res.status(400).json(err);
        }
    }

};


module.exports = userController;