const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const router = new express.Router();

router.post('/order', auth, async (req, res) => {
  const {orders, address} = req.body;
  
  if(!address || orders.length == 0){
    res.status(400);
    return res.send({error: "invalid form submission"});
  }
  
  const missingFields = orders.some(order => {
    return !order.pizzaType || !order.price || !order.amount;
  });
  
  if(missingFields){
    res.status(400);
    return res.send({error: "invalid form submission"});
  }
  let totalPrice = 0;
  for(let i = 0; i < orders.length; i++){
    totalPrice += (orders[i].price * orders[i].amount);
  }
  
  const order = new Order({
    ...req.body,
    totalPrice,
    user: req.user.id,
    address
  });
  
  try{
    await order.save();
    res.status(200);
    res.send(order);
  }catch(error){
    res.status(500);
    res.send({error: "server error"});
  }
});

router.post('/order/notsigned', async(req, res) => {
  const {name, address, orders} = req.body;
  
  if(!address || orders.length == 0){
    res.status(400);
    return res.send({error: "invalid form submission"});
  }
  
  const missingFields = orders.some(order => {
    return !order.pizzaType || !order.price || !order.amount;
  });
  
  if(missingFields){
    res.status(400);
    return res.send({error: "invalid form submission"});
  }
  
  let totalPrice = 0;
  for(let i = 0; i < orders.length; i++){
    totalPrice += (orders[i].price * orders[i].amount);
  }
  
  const order = new Order({
    ...req.body,
    totalPrice,
    name,
    address
  });
  
  try{
    await order.save();
    res.status(200);
    res.send(order);
  }catch(error){
    res.status(500);
    res.send({error: "server error"});
  }
});

module.exports = router;