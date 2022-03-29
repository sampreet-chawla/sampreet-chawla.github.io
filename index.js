// Fetch the project list and their details from Google API

// Google Sheets API V3
// let sheetAsJSON =
//  "https://spreadsheets.google.com/feeds/list/1PCS9xZV7bCEX0Onnkn6k4wbTPwxeKnLuKf8yjEsTEqQ/od6/public/values?alt=json";

// Google Sheets API V4
// Original URL - https://docs.google.com/spreadsheets/d/17Zk6aB24bRRA6p1-rH7-P6QTb-ggn39r/edit?usp=sharing&ouid=103149239452987594610&rtpof=true&sd=true
let sheetAsJSON = "https://sheets.googleapis.com/v4/spreadsheets/1PCS9xZV7bCEX0Onnkn6k4wbTPwxeKnLuKf8yjEsTEqQ/values/Sheet1";
$.ajax({ url: sheetAsJSON })
  .then((data) => {
    alert ("Project list: data: " + data);
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

// Flip Card Reference - https://www.w3schools.com/howto/howto_css_flip_card.asp
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

// Update the Contact Form Information to Google Sheets
const saveContact = async (name, email, message) => {
  const currentDate = new Date().toString();
  console.log(currentDate);
  try {
    const response = await fetch(
      "https://v1.nocodeapi.com/starmom123/google_sheets/fpIYCyfsXUemeqWJ?tabId=Contact",
      {
        method: "post",
        body: JSON.stringify([[name, email, message, currentDate]]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log("Success:", JSON.stringify(json));
    alert("Thanks for reaching out! I shall get back to you in 1-2 days.");
  } catch (error) {
    console.error("Error:", error);
    alert("Unable to save your details, Please try again later.");
  }
};

/* Save the Form details in google Sheet */
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
  // $(".btn-submit").attr("disabled", true); // Intentionally not disabling, may change it later if required.
});

/* Handle closing of navbar after selection of the nav-item */
$(".navbar-collapse a").click(function () {
  $collapseVal = $(".navbar-collapse").collapse();
  $(".navbar-collapse").collapse("hide");
});

/////////////////////////////
// Heading Animation Script

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

const heading = document.querySelector("#heading-animate");
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
