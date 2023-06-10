

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(express.json({ limit: "1mb" }));

main().catch(err => console.log(err));

async function main() {
  const uri = "mongodb+srv://admin:test123@cluster0.81arr57.mongodb.net/?retryWrites=true&w=majority";

  await mongoose.connect(uri);
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
        Item.insertMany(defaultItem);

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
            response[0].save();
          });
    res.redirect("/" + item_title);
    }
//   }
});


app.get("/about", function(req, res){
  res.render("about");
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server started on port 3000");
});

app.post('/delete', (req, res) => {
  const checkedName = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.deleteOne({ _id: checkedName }).then(() => res.redirect('/'));
  }
  else {
    customList.findOneAndUpdate({ name: listName }, { $pull: { content: { _id: checkedName } } })
      .then(() => {
        res.redirect("/" + listName);
      });

   
    }
  }
  )

const customSchema = new mongoose.Schema({
  name: String,
  content: [itemSchema],
})

const customList = mongoose.model("customList", customSchema);
app.get("/:title", (req, res) => {
  const title = _.capitalize(req.params.title);
  customList.findOne({ name: title })
    .then(response => {
      if (response) {
        res.render("list", { listTitle: response.name, newListItems: response.content})
      } else {
        customList.create({ 
          name: title,
          content: defaultItem
        })
        res.redirect("/" + title);
    }
  })
  
})