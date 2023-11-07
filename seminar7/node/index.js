const express = require('express');
const cors = require('cors');
const orders = require('./utils/constants');
const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.get('/', function (req, res) {
  res.send('Hello World')
})

// req params
app.get('/user/:id', function(req, res) {
    const id = req.params.id;
    res.send({msg: `User with id: ${id}`});
});

// req queries
app.get('/user', function(req, res) {
    const name = req.query.name;
    const age = req.query.age;

    res.send({msg: `User with name ${name} and age ${age}`});
});

app.get('/orders', function(req, res){
    res.status(200).json(orders);
});

app.get('/orders/:id', function(req, res){
    const id=parseInt(req.params.id);
    const foundOrder=orders.find(el=>el.id===id);

    if (foundOrder){
    res.status(200).json(foundOrder);
    } else{
        res.status(400).json({message:"Not found"});
    }

})

app.post('/orders', function(req,res){
    const newOrder = req.body;
    newOrder.id=orders.length+1;
    orders.push(newOrder);

    res.status(200).json(newOrder);
})

app.put("/orders/:id", function(req, res){
    const id=parseInt(req.params.id);

    const foundOrderIndex=orders.findIndex(el => el.id===id)

    if(foundOrderIndex!=-1){
        orders[foundOrderIndex]={...orders[foundOrderIndex], ...req.body};

        res.status(200).jsonp(orders[foundOrderIndex]);
    }else{
        res.status(404).json({message:'Order not found'})
    }
})

app.delete('/orders/:id', function(req, res){
    const id=parseInt(req.params.id);

    const foundOrderIndex=orders.findIndex(el=>el.id===id);

    if(foundOrderIndex!=-1){
        orders.splice(foundOrderIndex, 1);

        res.status(200).json({message:'Order deleted'});
    } else res.status(404).json({message:"Nor found"})
})

app.listen(3000, function() {
    console.log("Server listening on 3000");
})
