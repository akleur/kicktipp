import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const timestampSchema = mongoose.Schema({
    Version: String,
    Comment: String,
    date: String,
    timestamp: Number
});

timestampSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('VersionTimestamp', timestampSchema);
