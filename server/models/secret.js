const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = new Schema({
    message: {
        type: String,
        trim: true,
        default: 'Have you ever danced with the Devil in the Pale Moonlight?'
    }
})

let Secret = mongoose.model('Secret', SecretSchema)

module.exports = Secret