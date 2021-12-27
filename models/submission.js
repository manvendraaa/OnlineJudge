const mongoose = require('mongoose');

const submissionSchema =  new mongoose.Schema({
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    verdict: {
        type: String,
    }
    
},{
    timestamps: true
});

const Submission = mongoose.model('Submission',submissionSchema);
module.exports = Submission;