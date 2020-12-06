// Fetch the project list and their details from Google API
let sheetAsJSON =
  "https://spreadsheets.google.com/feeds/list/1PCS9xZV7bCEX0Onnkn6k4wbTPwxeKnLuKf8yjEsTEqQ/od6/public/values?alt=json";

$.ajax({ url: sheetAsJSON })
  .then((data) => {
    let projects = data.feed.entry.map((project) => {
      return {
        title: project.gsx$title.$t,
        image: project.gsx$image.$t,
        description: project.gsx$description.$t,
        techs: project.gsx$techs.$t,
        url: project.gsx$url.$t,
      };
    });

    return projects;
  })
  .then((projects) => {
    renderAllProjects(projects);
  });

// Update the Contact Form Information to Google Sheets
const saveContact = (name, email, message) => {
  const currentDate = new Date().toString();
  let text = {};
  console.log(currentDate);
  $.post(
    "https://sheetdb.io/api/v1/laljk8kowfvxr",
    {
      data: [{ Name: name, Email: email, Message: message, Date: currentDate }],
    },
    function (data, status) {
      console.log(
        "Data: " + JSON.stringify(data) + "\nStatus: " + status + "\n "
      );
      if (status === "success") {
        alert("Thanks for reaching out! I shall get back to you in 1-2 days.");
      } else {
        alert("Unable to save your details, Please try again later.");
      }
    }
  );
  return text;
};

// Flip Card Reference - https://www.w3schools.com/howto/howto_css_flip_card.asp
// <img src="${project.image}" alt="${project.image}" style="width:300px;height:auto;margin:auto;">
{
  /* <img src="${project.image}" alt="${project.title} picture" style="width:300px;height:300px;" ></img> */
}
// Render the cards
const renderAllProjects = (projects) => {
  projects.forEach((project) => {
    const $article = $(
      `<div class="project-card">
        <div class="project-card-inner">
          <div class="project-card-front">            
          <img src="${project.image}" alt="${project.title} picture" style="width:300px;height:340px;" />
          </div>
          <div class="project-card-back">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <p>${project.techs}</p>
            <a href="${project.url}" class="btn btn-primary" target="_blank">View Project</a>
          </div>
        </div>
      </div>`
    );
    $(".projects-main").append($article);
  });
};

$("form").on("submit", (event) => {
  event.preventDefault();

  const fullName = $("#full-name").val();
  const email = $("#email").val();
  const message = $("#message").val();

  console.log(
    `Get In Touch - Full Name: ${fullName}, email: ${email}, message: "${message}"`
  );
  saveContact(fullName, email, message);
  $("#contact-thanks").text("Thanks for reaching out.").css("display", "block");

  $(event.currentTarget).trigger("reset");
  $(".btn-submit").attr("disabled", true);
});

$(".navbar-collapse a").click(function () {
  $collapseVal = $(".navbar-collapse").collapse();
  $(".navbar-collapse").collapse("hide");
});

/////////////////////////////
// Heading Animation Script

const heading = document.querySelector("#heading-animate");

function triggerAnimationSequence(element) {
  const lettersArray = element.innerHTML.trim().split("");
  let delay = 0;

  element.innerHTML = "";
  lettersArray.forEach((letter) => {
    let span = document.createElement("SPAN");
    let attr = document.createAttribute("data-animate");

    span.setAttributeNode(attr);
    span.innerHTML = letter;
    span.style.transitionDelay = `${delay}ms`;
    element.appendChild(span);

    void span.offsetWidth;
    span.classList.add("animated");
    delay += 70;
  });

  element.removeAttribute("data-animate");
}

setTimeout(() => {
  triggerAnimationSequence(heading);
}, 200);

const subHeading = document.querySelector("#sub-heading-animate");
setTimeout(() => {
  triggerAnimationSequence(subHeading);
}, 200);

/////////////////////////
// For Goto Top Button
// Source Code from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myTopBtn").style.display = "block";
  } else {
    document.getElementById("myTopBtn").style.display = "none";
  }
}
var $root = $("html, body");
$(document).on("click", 'a[href^="#"]', function (event) {
  event.preventDefault();
  $root.animate({ scrollTop: $($.attr(this, "href")).offset().top }, 800);
});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
$("#myTopBtn").click(function () {
  $root.animate({ scrollTop: 0 }, 800);
});
$(() => {
  var $scroller = $("#site-wrapper");
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $scroller.stop().animate(
      {
        scrollTop:
          $target.offset().top - $scroller.offset().top + $scroller.scrollTop(),
      },
      900,
      "swing",
      function () {
        window.location.hash = target;
      }
    );
  });
});
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
