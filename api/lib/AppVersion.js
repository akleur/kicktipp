import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const appVersionSchema = mongoose.Schema({
    date: String,
    timestamp: Number
});

appVersionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('AppVersion', appVersionSchema);
