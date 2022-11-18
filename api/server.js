const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 3000; 
const bodyParser = require('body-parser')



let gravitars = [
    {"id": 1, "gravitar": "life"},
    {"id": 2, "gravitar": "liberty"},
    {"id": 3, "gravitar": "pursuit of happiness"}, 
]; 

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'Home'});
}); 

app.get("/gravitars", (req, res) => {
    res.json(gravitars);
})

const findGravitarById = (id) => {
    return Object.values(gravitars).find(gravitar => gravitar.id == id)
}

app.get("/gravitars/:id", (req, res) => {
    var id = parseInt(req.params.id);
    if(!isNaN(id)){
        var gravitar = findGravitarById(id); 
        if(gravitar !== null && gravitar !== undefined)
        {
            res.json(findGravitarById(id));
        }
        else
        {
            res.json({ message: "no gravitar was found with that id."});
        }
    } else {
        res.json({ error: "id should be a parameter."});
    }
});

app.post("/gravitars", (req, res) => {
    if(req.body.id){
        var id = parseInt(req.body.id); 
        if(!isNaN(id)){
            var gravitar = findGravitarById(id);
            if(gravitar !== null && gravitar !== undefined){
                res.json({message: "gravitar id already exists."}); 
            } 
            else 
            {
                gravitars.push(req.body); 
                res.json({message: "gravitar added."});
            }
        } else {
            res.json({ error: "Id parameter should be a number"}); 
        }
    } else {
        res.json({ error: "Id is missing in the POST request"});
    }
})

const modifyGravitarById = (id, updatedGravitar) => {
    gravitars.find(function(gravitar, i){
        if(gravitar.id === id){
            gravitars[i] = updatedGravitar;
        }
    });
}; 

app.put("/gravitars", (req, res) => {
    if(req.body.id){
        var id = parseInt(req.body.id); 

        if(!isNan(id)){
            var gravitar = findGravitarById(id); 

            if(gravitar !== null && gravitar !== undefined){
                modifyGravitarById(id, req.body)
                res.json({ message: "Gravitar was modified."}); 
            } else {
                res.json({ message: "Gravitar does not exist." }); 
            }
        } else {
            res.json({ error: "Id parameter should be a number."}); 
        }
    } else {
        res.json({ error: "Id is missing in the PUT request."});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});