var Book = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    isbn: "",
  },
});

const app = document.getElementById("landing");

const container = document.createElement("div");
container.setAttribute("class", "row");

app.appendChild(container);

window.onload = function () {
  document.getElementById("top").style.display = "none";
  document.querySelector("#cards").style.display = "none";
};

x = document.querySelector("#landing");

x.addEventListener("click", (e) => {
  console.log("HI CLICKED");

  e.preventDefault();

  if (e.target.innerHTML === "Add New Blog") {
    document.querySelector("#cards").style.display = "block";

    e2 = e.target.parentElement.parentElement;
    console.log(e2);
    // console.log(e.target.parentElement);

    x.style.display = "none";
    document.getElementById("top").style.display = "block";
  }
});

//Backbone Collection

var Books = Backbone.Collection.extend({});

var books = new Books();

// Backbone View for one book
var BookView = Backbone.View.extend({
  model: new Book(),

  tagName: "tr",

  initialize: function () {
    this.template = _.template($(".blogs-list-template").html());
  },
  events: {
    "click .delete-blog": "delete",
    "click .edit-blog": "edit",
    "click .update-blog": "update",
    "click .done": "done",
  },
  edit: function () {
    $(".edit-blog").hide();
    $(".delete-blog").hide();
    this.$(".update-blog").show();
    this.$(".done").show();

    var author = this.$(".author").html();

    var title = this.$(".title").html();
    var isbn = this.$(".isbn").html();

    this.$(".author").html(
      '<input type="text" class="form-control author-update" value="' +
        author +
        '">'
    );
    this.$(".title").html(
      '<input type="text" class="form-control title-update" value="' +
        title +
        '">'
    );
    this.$(".isbn").html(
      '<input type="text" class="form-control isbn-update" value="' +
        isbn +
        '">'
    );
  },
  update: function () {
    this.model.set("author", $(".author-update").val());
    this.model.set("title", $(".title-update").val());
    this.model.set("isbn", $(".isbn-update").val());
  },

  done: function () {
    booksView.render();
  },

  delete: function (e) {
    e.target.parentElement.parentElement.remove();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },
});

// Backbone View for all books

var BooksView = Backbone.View.extend({
  model: books,
  el: $("#book-list"),
  initialize: function () {
    console.log(this.model);
    var self = this;
    this.model.on("add", this.render, this);
  },
  render: function () {
    var self = this;
    this.$el.html("");
    // _.each(this.collection.models, function () {
    //   console.log(m.get("title"));
    // });

    _.each(this.model.toArray(), function (book) {
      console.log(book.get("title"));
      const card = document.createElement("div");
      card.setAttribute("class", "card col-sm-12 col-md-6 col-lg-3");

      const img = document.createElement("IMG");
      img.setAttribute("id", "imgs");
      img.src = book.get("url");

      const h1 = document.createElement("h1");
      h1.setAttribute("id", "title");
      h1.textContent = `Title: ${book.get("title")}`;

      const h2 = document.createElement("h1");
      h2.setAttribute("id", "author");
      h2.textContent = `Author: ${book.get("author")}`;

      card.appendChild(img);
      card.appendChild(h1);
      card.appendChild(h2);
      container.appendChild(card);

      // x = document.querySelector("#cards");
      // x.appendChild(card);

      // self.$el.append(new BookView({ model: book }).render().$el);
    });

    return this;
  },
});

var booksView = new BooksView();

$(document).ready(function () {
  $(".add").on("click", function (e) {
    e.preventDefault();

    var book = new Book({
      title: $("#title").val(),
      author: $("#author").val(),

      isbn: $("#isbn").val(),
      url: $("#url").val().toString(),
    });
    console.log(book);
    $("#title").val("");
    $("#author").val("");

    $("#isbn").val("");
    $("#url").val("");
    books.reset();
    books.add(book);
  });

  // var top = document.querySelector("#top");
  // top.addEventListener("click", (e) => {
  //   // top.addEventListener("click", (e) => {
  //   if (e.target.innerHTML == "Add Book") {
  //     console.log("hello");
  //   }
  // });

  // const card = document.createElement("div");
  // card.setAttribute("class", "card col-sm-12 col-md-6 col-lg-3");

  // const img = document.createElement("IMG");
  // img.setAttribute("id", "imgs");
  // img.src = url;
  //   });
  // });

  top.addEventListener("click", (e) => {
    c = document.querySelector("#cards");
    x = document.querySelector("#landing");
    var top = document.querySelector("#top");

    if (e.target.innerHTML == "Back") {
      console.log("back clicked");
      x.style.display = "block";
      top.style.display = "none";
    }

    // bottom.innerHTML = "";

    var bottom = document.querySelector("#bottom");
    if (e.target.innerHTML === "View Book") {
      console.log(e.target);
      e2 = e.target.parentElement.parentElement;
      console.log(e2);
      top.style.display = "none";
      bottom.style.display = "block";

      b = document.createElement("button");
      b.setAttribute("id", "btn");
      b.setAttribute("class", "btn btn-success");
      b.textContent = "GO BACK";

      const image = document.createElement("IMG");
      image.setAttribute("id", "img2");

      image.src = e2.querySelector("img").src;
      console.log(image.src);

      h1 = document.createElement("h1");
      h1.setAttribute("class", "display-4");
      h1.setAttribute("style", "text-align:center");
      h1.innerHTML = e2.querySelector(".title").innerHTML;

      h2 = document.createElement("h1");
      h2.setAttribute("class", "display-4");
      h2.setAttribute("style", "text-align:center");
      h2.innerHTML = e2.querySelector(".author").innerHTML;

      h3 = document.createElement("h1");
      h3.setAttribute("class", "display-4");
      h3.setAttribute("style", "text-align:center");
      h3.innerHTML = e2.querySelector(".isbn").innerHTML;

      bottom.appendChild(b);
      bottom.appendChild(image);
      bottom.appendChild(h1);
      bottom.appendChild(h2);
      bottom.appendChild(h3);

      document.querySelector("#btn").addEventListener("click", (e) => {
        if (top.style.display === "none") {
          top.style.display = "block";
        }
        bottom.innerHTML = "";
      });
    }
  });
});
