var Book = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    blog_text: "",
  },
});
var count = 0;
var blogText_full = [];
const app = document.getElementById("cards");

const container = document.createElement("div");
container.setAttribute("class", "row");

app.appendChild(container);

//when page first loads then only landing page should be displayed all other sections should dissapear
window.onload = function () {
  document.getElementById("top").style.display = "none";
  document.querySelector("#cards").style.display = "none";
};

x = document.querySelector("#landing");
x.addEventListener("click", (e) => {
  e.preventDefault();
  //When user clicks on add new block button on home page
  if (e.target.innerHTML === "Add New Blog") {
    document.querySelector("#cards").style.display = "block";
    e2 = e.target.parentElement.parentElement;
    console.log(e2);

    // console.log(e.target.parentElement);

    x.style.display = "none";
    //display form section and dissapear home page
    document.getElementById("top").style.display = "block";
  }
});

//Backbone Collection

var Books = Backbone.Collection.extend({});

var books = new Books();

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

    //taking data from model(which got data from form) and putting this data in form of cards
    //in homescreen

    _.each(this.model.toArray(), function (book) {
      console.log(book.get("title"));
      const card = document.createElement("div");
      card.setAttribute("class", "card col-sm-12 col-md-6 col-lg-3");

      const card1 = document.createElement("div");
      card1.setAttribute("class", "card-header");

      const img = document.createElement("IMG");
      img.setAttribute("id", "imgs");
      img.src = book.get("url");
      console.log(img.src);
      console.log(book.get("url"));
      if (book.get("url") === "") {
        img.src =
          "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
      }

      card1.appendChild(img);

      const card2 = document.createElement("div");
      card2.setAttribute("id", "card2");
      card2.setAttribute("class", "card-body");

      var h1 = document.createElement("p");
      h1.setAttribute("id", "titles");
      h1.textContent = `Title: ${book.get("title")}`;

      var h2 = document.createElement("p");
      h2.setAttribute("id", "authors");
      h2.textContent = `Author: ${book.get("author")}`;

      var h3 = document.createElement("p");
      h3.setAttribute("id", "summary");
      h3.setAttribute("style", "font-family: 'Roboto', sans-serif");
      console.log(book.get("BlogText"));
      // h3.textContent = `Summary: ${book.get("blog_text")}`;
      console.log(book.get("blog_text").length);
      blogText_full.push(book.get("blog_text"));
      console.log(blogText_full);
      h3.textContent = `Summary: ${book.get("blog_text")}`;

      const butrj = document.createElement("button");
      butrj.textContent = "View Blog";
      butrj.setAttribute("class", "rjbt btn btn-info");

      // card2.appendChild(img);
      card2.appendChild(h1);
      card2.appendChild(h2);
      if (book.get("blog_text").length > 133) {
        const text = book.get("blog_text").substring(0, 132);
        h3.textContent = `Summary: ${text}`;
      }
      card2.appendChild(h3);
      // card2.appendChild(butrj);
      card.appendChild(card1);
      card.appendChild(card2);
      card.appendChild(butrj);

      count = count + 1;
      if (count > 0) {
        console.log(count);
        $("#headCount").remove();
      }
      card.setAttribute("id", `card` + count);

      container.appendChild(card);

      console.log(count);
    });

    return this;
  },
});
console.log(count);

var booksView = new BooksView();

$(document).ready(function () {
  $(".add").on("click", function (e) {
    e.preventDefault();

    var book = new Book({
      title: $("#title").val(),
      author: $("#author").val(),

      blog_text: $("#BlogText").val(),

      url: $("#url").val().toString(),
    });

    // if form fields emppty then show alert
    if (
      $("#title").val() === "" ||
      $("#author").val() === "" ||
      $("#BlogText").val() === ""
    ) {
      const div = document.createElement("div");
      div.className = "alert alert-danger";
      div.appendChild(document.createTextNode("Please fill in all Fields"));
      const container = document.querySelector("#topcontainer");
      const form = document.querySelector("#book-form");
      container.insertBefore(div, form);
      setTimeout(() => document.querySelector(".alert").remove(), 2000);
    } else {
      console.log(book);
      $("#title").val("");
      $("#author").val("");

      $("#BlogText").val("");
      $("#url").val("");
      books.reset();
      books.add(book);

      //when blog added after clicking add blog show successful message

      const div = document.createElement("div");
      div.className = "alert alert-success";
      div.appendChild(
        document.createTextNode("Blog Added Successfully to homescreen")
      );
      const container = document.querySelector("#topcontainer");
      const form = document.querySelector("#book-form");
      container.insertBefore(div, form);

      // Vanish in 3 seconds
      setTimeout(() => document.querySelector(".alert").remove(), 2000);
    }
  });

  //Enlarge click
  var landing = document.querySelector("#landing");

  var enlarged = document.querySelector("#enlarged");

  landing.addEventListener("click", (e) => {
    if (e.target.innerHTML === "View Blog") {
      console.log("hellooo");
      // e2= Required Event, when clicken on button, it will take that event but we need data from
      //its parent e.target, that is card, so we use below e.target.parentElement
      e2 = e.target.parentElement;
      console.log(e.target.parentElement);
      console.log(e2.id[4]);

      landing.style.display = "none";
      enlarged.style.display = "block";

      back = document.createElement("button");
      back.setAttribute("id", "btn_back");
      back.setAttribute("class", "btn btn-success btn-lg");
      back.textContent = "GO BACK";

      edit = document.createElement("button");
      edit.setAttribute("id", "edit");
      edit.setAttribute("class", "btn btn-info btn-lg");
      edit.textContent = "Edit";

      save = document.createElement("button");
      save.setAttribute("id", "save");
      save.setAttribute("class", "btn btn-success btn-lg");
      save.textContent = "Save";

      back = document.createElement("button");
      back.setAttribute("id", "btn_back");
      back.setAttribute("class", "btn btn-success btn-lg");
      back.textContent = "GO BACK";

      // Country Name of particular click
      const img = e2.querySelector("img").src;

      var title = e2.querySelector("#titles").innerHTML;

      h = document.createElement("h1");
      h.setAttribute("class", "display-4");
      h.setAttribute("id", "h");

      console.log(title);
      h.innerHTML = title;

      h1 = document.createElement("h1");
      h1.setAttribute("class", "display-4");
      h1.setAttribute("id", "h1");
      // h1.setAttribute("style", "text-align:center");
      var author = e2.querySelector("#authors").innerHTML;

      h1.innerHTML = author;

      h2 = document.createElement("h1");
      h2.setAttribute("class", "display-4");
      h2.setAttribute("id", "h2");

      // h2.setAttribute("style", "text-align:center");
      h2.setAttribute("style", "border:1px");
      h2.setAttribute("style", "font-family: 'Roboto', sans-serif");
      // var blog = e2.querySelector("#summary").innerHTML;
      console.log(blogText_full[0]);
      console.log(e2.id);
      var blog = blogText_full[e2.id[4] - 1];

      console.log(blog);
      h2.innerHTML = blog;

      blog_heading = document.createElement("h1");
      blog_heading.setAttribute("class", "display-4");
      blog_heading.setAttribute("id", "blogheading");
      blog_heading.setAttribute("style", "text-align:center");
      blog_heading.innerHTML = "Blog";

      const image = document.createElement("IMG");
      image.setAttribute("id", "img3");
      image.src = img;
      $("#save").hide();

      const cardBig = document.createElement("div");

      cardBig.setAttribute("class", "card");
      cardBig.setAttribute("id", "cardBig");

      const cardBig1 = document.createElement("div");
      cardBig1.setAttribute("class", "card-header");
      cardBig1.appendChild(image);

      const cardBig2 = document.createElement("div");
      cardBig2.setAttribute("class", "card-body");
      cardBig2.appendChild(h);
      cardBig2.appendChild(h1);
      cardBig2.appendChild(blog_heading);
      cardBig2.appendChild(h2);
      cardBig2.appendChild(back);
      cardBig2.appendChild(edit);
      cardBig2.appendChild(save);

      cardBig.appendChild(cardBig1);
      cardBig.appendChild(cardBig2);

      enlarged.appendChild(cardBig);

      document.querySelector("#edit").addEventListener("click", (e) => {
        // var content = document.querySelector("#h2").childElement.value;
        // console.log(content);
        console.log("helllllooo");
        $("#edit").hide();
        $("#save").show();

        console.log(e.target.parentElement);
        console.log(document.querySelector("#h1").innerHTML);
        var title = document.querySelector("#h").innerHTML.substring(6);
        var author = document.querySelector("#h1").innerHTML.substring(7);
        var summary = document.querySelector("#h2").innerHTML;
        console.log(title);
        console.log(summary);

        $("#h").html(
          '<input type="text" class="form-control title-update" value="' +
            title +
            '">'
        );
        $("#h1").html(
          '<input type="text" class="form-control author-update" value="' +
            author +
            '">'
        );
     
        $("#h2").html(
          '<textarea class="form-control summary-update"  rows="8" cols="200" value="' +
            summary +
            '"></textarea>'
        );
        // $("#h2").html(
        //   '<textarea class="form-control summary-update"  rows="8" cols="200">`${summary}`</textarea>'
        // );

        // <textarea class="form-control summary-update"  rows="8" cols="200" value="'+summary+'">></textarea>
      });
      document.querySelector("#save").addEventListener("click", (e) => {
        console.log("helllllooo");
        $("#save").hide();
        $("#edit").show();

      
        document.querySelector("#h").innerHTML =
          `Title: ` + $(".title-update").val();

        document.querySelector("#h1").innerHTML =
          `Author: ` + $(".author-update").val();

     
        console.log($(".summary-update").val());
        console.log(
          document.querySelector(".summary-update").getAttribute("value")
        );

        if ($(".summary-update").val() == "") {
          document.querySelector("#h2").innerHTML = document
            .querySelector(".summary-update")
            .getAttribute("value");
        } else {
          document.querySelector("#h2").innerHTML = $(".summary-update").val();
        }
        console.log(document.querySelector("#titles").innerHTML.substring(6));
        const a = document.querySelector("#h").innerHTML;
        const b = document.querySelector("#h1").innerHTML;

        //To reflect update made in enlarged screen back to card
        document.querySelector("#titles").innerHTML =
          `Title: ` + a.substring(8);
        document.querySelector("#authors").innerHTML =
          `Author: ` + b.substring(8);
      });

      document.querySelector("#btn_back").addEventListener("click", (e) => {
        if (landing.style.display === "none") {
          landing.style.display = "block";
        }
        enlarged.innerHTML = "";
      });
    }
  });

  top.addEventListener("click", (e) => {
    c = document.querySelector("#cards");
    x = document.querySelector("#landing");
    var top = document.querySelector("#top");

    if (e.target.innerHTML === "Go Back to Homescreen") {
      e.preventDefault();
      console.log("back clicked");
      x.style.display = "block";
      top.style.display = "none";
    }
  });
});
if (count === 0) {
  console.log("aaaaaa");
  xx = document.querySelector("#counter");
  const headCount = document.createElement("h2");
  headCount.setAttribute("id", "headCount");
  headCount.innerHTML = "No Blogs Added. Add Now !";
  console.log(xx);
  xx.appendChild(headCount);
}
