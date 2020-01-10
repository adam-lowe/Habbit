const mongoose = require('mongoose');
const db = mongoose;
db.set('useNewUrlParser', true);
db.set('useFindAndModify', false);
db.set('useCreateIndex', true);
db.set('useUnifiedTopology', true);
module.exports = {
    db
}