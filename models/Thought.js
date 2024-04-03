// Purpose: To create a Thought model for the NoSQL Social Network API.
const {Schema, model} = require('mongoose');

const reactionSchema = require('./Reaction');

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const thoughtSchema = new Schema({
    
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Created a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;