const mongoose = require('mongoose');

const problemSchema =  new mongoose.Schema({
    statement: {
        type: String,
        // required: true,
        // unique: true
    },
    name: {
        type: String,
        // required: true

    },
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission'
        }
    ],
    input: {
        type: String
    },
    output: {
        type: String
    }
});

const Problem = mongoose.model('Problem',problemSchema);
module.exports = Problem;