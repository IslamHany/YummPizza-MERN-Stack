const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const keys = require('./config/keys');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(orderRouter);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

//Serve static assets in production
if(process.env.NODE_ENV === 'production' || true){
    //Set static folder
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});