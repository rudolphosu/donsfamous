const express = require('express');
const app = express();

const photo = require('photo.js')
const { test, getElementById, getIndexById, updateElement } = require('./utils');

const PORT = process.env.PORT || 4001;

const photos = []

app.get('/photos', (req,res,next)=>{
  res.send(photos);
});

app.get('/photos/:id', (req,res,next)=>{
  element = getElementById(req.params.id,photos);
  if(element){
    res.send(element);
  }else{
    res.status(404).send("Invalid ID");
  }
});

app.post('/photos', (req,res,next)=>{
  if(!req.query.hasOwnProperty('id')){
    res.status(400).send("Invalid properties");
  }else{
    newPhoto = new photo.Photo(req.query.id);
    photos.push(newPhoto);
    res.status(201).send(photo);
  }
});

app.put('/photos/:id', (req,res,next)=>{
  index = getIndexById(req.params.id,photos);
  if(index>=0){
    updateElement(req.params.id,req.query,photos);
    res.send(photos[index]);
  }else{
    res.status(404).send();
  }
});

app.delete('/photos/:id', (req,res,next)=>{
  index = getIndexById(req.params.id,photos);
  if(index>=0){
    photos.splice(index,1)
    res.status(204).send();
  }else{
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
