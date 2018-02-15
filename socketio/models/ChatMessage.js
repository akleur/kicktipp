import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const chatMessageSchema = mongoose.Schema({
    username: String,
    text: String,
    date: String,
    timestamp: Number
});

chatMessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
