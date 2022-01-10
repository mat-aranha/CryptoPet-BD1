const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://mat_aranha:mat50592971@cryptopet.x1xj7.mongodb.net/CryptoPet?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const paymentSchema = new mongoose.Schema({
    id: String,
    itemId: String,
    paid: Boolean
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
    Payment
}