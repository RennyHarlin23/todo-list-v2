//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.json({ limit: "1mb" }));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
  console.log("Mongoose connected")
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const itemSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model('Item', itemSchema);

const Item1 = new Item({
  name: "Welcome to Todo list"
})

const Item2 = new Item({
  name: "Click the + button to add"
})

const Item3 = new Item({
  name: "<---Click here to remove item"
})

const defaultItem = [Item1, Item2, Item3];


app.get("/", function (req, res) {


  Item.find({})
    .then((response) => {
      if (response.length === 0) {
        Item.insertMany(defaultItem).then(() => console.log("Successfully saved"));

      }
    })

  let def_items = [];
  main();
  async function main() {
    const items = await Item.find({});
    items.forEach(item =>
      def_items.push(item)
    )
    res.render("list", {listTitle: "Today", newListItems: def_items});

  }
  
  
});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const item_title = req.body.list;
  
  

  if (item_title === 'Today') {
    Item.create({
      name: item
   })
    res.redirect('/');
  } else {

    const newItem = new Item({
      name: item
    })
        customList.find({ name: item_title })
          .then(response => {
            response[0].content.push(newItem);
          });
    }
//   }
});


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

app.post('/delete', (req, res) => {
  const checkedName = req.body.checkbox;
  Item.deleteOne({ _id: checkedName }).then(() => res.redirect('/'));
  })

const customSchema = new mongoose.Schema({
  name: String,
  content: [itemSchema],
})

const customList = mongoose.model("customList", customSchema);
app.get("/:title", (req, res) => {
  const title = req.params.title;


  customList.findOne({ name: title })
    .then(response => {
      if (response) {
        console.log("exists")
        res.render("list", { listTitle: response.name, newListItems: response.content})
      } else {
        console.log("Does not exist")
        customList.create({ 
          name: title,
          content: defaultItem
        })
        res.redirect("/" + title);
    }
  })
  
})