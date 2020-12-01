var Blog = Backbone.Model.extend({
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

window.onload = function () {
  document.getElementById("top").style.display = "none";
  document.querySelector("#cards").style.display = "none";
};

x = document.querySelector("#landing");
x.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.innerHTML === "Add New Blog") {
    document.querySelector("#cards").style.display = "block";
    e2 = e.target.parentElement.parentElement;

    x.style.display = "none";

    document.getElementById("top").style.display = "block";
  }
});

//Backbone Collection
var Blogs = Backbone.Collection.extend({});
var blogs = new Blogs();

// Backbone View for all blogs
var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $("#book-list"),
  initialize: function () {
    var self = this;
    this.model.on("add", this.render, this);
  },
  render: function () {
    var self = this;
    this.$el.html("");

    _.each(this.model.toArray(), function (book) {
      const card = document.createElement("div");
      card.setAttribute("class", "card col-xs-12 col-sm-12 col-md-6 col-lg-3");

      const card1 = document.createElement("div");
      card1.setAttribute("class", "card-header");

      const img = document.createElement("IMG");
      img.setAttribute("id", "imgs");
      img.src = book.get("url");

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
      h1.textContent = `${book.get("title")}`;

      var h2 = document.createElement("p");
      h2.setAttribute("id", "authors");

      h2.innerHTML = `<i class="fas fa-user"></i>` + book.get("author");

      var h3 = document.createElement("p");
      h3.setAttribute("id", "summary");
      h3.setAttribute("style", "font-family: 'Roboto', sans-serif");

      blogText_full.push(book.get("blog_text"));

      h3.textContent = `Summary: ${book.get("blog_text")}`;

      const butrj = document.createElement("button");
      butrj.textContent = "View Blog";
      butrj.setAttribute("class", "rjbt btn btn-info");

      card2.appendChild(h1);
      card2.appendChild(h2);
      if (book.get("blog_text").length > 133) {
        const text = book.get("blog_text").substring(0, 132);
        h3.textContent = `Summary: ${text}`;
      }
      card2.appendChild(h3);

      card.appendChild(card1);
      card.appendChild(card2);
      card.appendChild(butrj);

      count = count + 1;
      if (count > 0) {
        $("#headCount").remove();
      }
      card.setAttribute("id", `card` + count);

      container.appendChild(card);
    });

    return this;
  },
});

var blogsView = new BlogsView();

$(document).ready(function () {
  $(".add").on("click", function (e) {
    e.preventDefault();

    var blog = new Blog({
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
      $("#title").val("");
      $("#author").val("");

      $("#BlogText").val("");
      $("#url").val("");
      // books.reset();
      // books.add(book);
      blogs.reset();
      blogs.add(blog);

      const div = document.createElement("div");
      div.className = "alert alert-success container mt-3";
      div.appendChild(
        document.createTextNode("Blog Added Successfully to homescreen")
      );
      div.setAttribute("style", "text-align:center");

      const container = document.querySelector("body");
      const form = document.querySelector("#alertdiv");
      container.insertBefore(div, form);

      setTimeout(() => document.querySelector(".alert").remove(), 3000);

      document.querySelector("#landing").style.display = "block";
      document.querySelector("#top").style.display = "none";
    }
  });

  //Enlarge click
  var landing = document.querySelector("#landing");

  var enlarged = document.querySelector("#enlarged");

  landing.addEventListener("click", (e) => {
    if (e.target.innerHTML === "View Blog") {
      console.log("hellooo");

      e2 = e.target.parentElement;

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
      h.setAttribute("style", "font-family:fell,Georgia,Times New Roman");

      h.setAttribute("style", "font-weight:600;");

      h.innerHTML = title;

      h1 = document.createElement("h2");

      h1.setAttribute("id", "h1");

      h1.setAttribute("style", "font-family:sohne, 'Helvetica Neue'");
      h1.setAttribute("style", "font-weight:600;");

      var author = e2.querySelector("#authors").innerHTML.substring(42);

      h1.innerHTML = `<i class="fas fa-user"></i>` + author;

      h2 = document.createElement("h1");
      h2.setAttribute("class", "display-4");
      h2.setAttribute("id", "h2");

      h2.setAttribute("style", "border:1px");
      h2.setAttribute("style", "font-family: 'Roboto', sans-serif");

      var blog = blogText_full[e2.id[4] - 1];

      h2.innerHTML = blog;

      var current_date = document.createElement("p");
      current_date.setAttribute("style", "font-weight:400");
      current_date.innerHTML = new Date().toString().substring(4, 15);

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
      cardBig2.appendChild(current_date);
      cardBig2.appendChild(blog_heading);
      cardBig2.appendChild(h2);
      cardBig2.appendChild(back);
      cardBig2.appendChild(edit);
      cardBig2.appendChild(save);

      cardBig.appendChild(cardBig1);
      cardBig.appendChild(cardBig2);

      enlarged.appendChild(cardBig);

      document.querySelector("#edit").addEventListener("click", (e) => {
        document.querySelector("body").classList.add("editing");
        $("#edit").hide();
        $("#save").show();

        var title = document.querySelector("#h").innerHTML;
        var author = document.querySelector("#h1").innerHTML.substring(46);
        var summary = document.querySelector("#h2").innerHTML;

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
      });
      document.querySelector("#save").addEventListener("click", (e) => {
        document.querySelector("body").classList.remove("editing");
        $("#save").hide();
        $("#edit").show();

        document.querySelector("#h").innerHTML = $(".title-update").val();

        document.querySelector("#h1").innerHTML =
          `<i class="fas fa-user"></i>` + $(".author-update").val();

        if ($(".summary-update").val() == "") {
          document.querySelector("#h2").innerHTML = document
            .querySelector(".summary-update")
            .getAttribute("value");
        } else {
          document.querySelector("#h2").innerHTML = $(".summary-update").val();
        }

        const a = document.querySelector("#h").innerHTML;
        const b = document.querySelector("#h1").innerHTML;

        document.querySelector("#titles").innerHTML = a;

        document.querySelector("#authors").innerHTML = b;
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

      x.style.display = "block";
      top.style.display = "none";
    }
  });
});
if (count === 0) {
  xx = document.querySelector("#counter");
  const headCount = document.createElement("h2");
  headCount.setAttribute("id", "headCount");
  headCount.innerHTML = "No Blogs Added. Add Now !";

  xx.appendChild(headCount);
}
