// alert("Working Execute js file");

scrapePage();

function secondProjectPage(nextTab, summary) {
  console.log("secondPage", nextTab.document);

  console.log(
    "The btn second page :",
    nextTab.document.querySelector("#createGlobalItem")
  );
  nextTab.document.querySelector("#createGlobalItem").click();

  // Input Section
  setTimeout(() => {
    const inputSection = nextTab.document.querySelector(".css-1j124qj");

    inputSection.click();
    console.log("inputsection : ", inputSection);

    setTimeout(() => {
      console.log(
        "The input fields Of Create Section : ",
        inputSection.querySelectorAll(".css-1cab8vv")
      );

      // inputSection.querySelector("#summary-field").value = summary;

      inputSection.querySelector(".css-w9huf").removeAttribute("data-invalid");

      // inputSection
      //   .querySelector("#summary-field")
      //   .setAttribute("value", summary);

      inputSection
        .querySelector("#summary-field")
        .removeAttribute("aria-invalid");

      inputSection
        .querySelector("#summary-field")
        .setAttribute(
          "aria-describedby",
          "summary-field-valid summary-field-helper"
        );

      inputSection.querySelector("#summary-field").focus();

      const event = new KeyboardEvent("keyup", { key: "a" });
      inputSection.querySelector("#summary-field").blur();
      const event2 = new KeyboardEvent("keyup", { key: "b" });
      inputSection.querySelector("#summary-field").dispatchEvent(event);
      inputSection.querySelector("#summary-field").dispatchEvent(event2);

      console.log("DONE!!");

      // inputSection
      //   .querySelector("#summary-field")
      //   .setAttribute("value", summary);

      // inputSection.querySelector("#summary-field-error").remove();

      // inputSection.querySelector("#summary-field").focus();
      // inputSection.querySelectorAll(".css-1cab8vv")[0].focus();

      // summaryinput.dispatchEvent(new Event("input", { bubbles: true }));

      // console.log("THe enter event of keyboard is fired");

      // // inputSection
      // //   .querySelectorAll(".css-1cab8vv")[0]
      // //   .dispatchEvent(new KeyboardEvent("keyup", { key: "1" }));

      // console.log(
      //   "The value of summary input : ",
      //   inputSection.querySelectorAll(".css-1cab8vv")[0].value
      // );

      // console.log(
      //   "Reqiored attr removed : ",
      //   inputSection.querySelectorAll(".css-1cab8vv")[0]
      // );

      // // create button
      // console.log(
      //   "the create Issue button : ",
      //   inputSection.querySelector(".css-1yeatxf")
      // );

      // setTimeout(() => {
      //   inputSection.querySelector(".css-1yeatxf").click();
      //   // console.log("Button was clicked...");
      // }, 3000);
    }, 2000);

    inputSection
      .querySelector("#summary-field")
      .addEventListener("keyup", (ev) => {
        console.log(`key=${ev.key}`);
        ev.target.value += ev.key;
      });
  }, 3000);
}

async function scrapePage() {
  // Adding jquery
  /*   const script = document.createElement("script");
    script.onload = function () {
      jQuery.noConflict();
      if (callback) {
        callback(jQuery);
      }
    };
    // script.src = "http://code.jquery.com/jquery-2.1.1.min.js";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    document.getElementsByTagName("head")[0].appendChild(script); */

  alert("Working Good");

  const summary = document.querySelector("._osi5fg65").innerText;
  console.log("Summary : ", summary);

  // console.log(
  //   "The text field there : ",
  //   document.querySelector(".css-1j124qj")
  // );

  // Input Section
  // const inputSection = document.querySelector(".css-1j124qj");
  // console.log(
  //   "The input fields : ",
  //   inputSection.querySelectorAll(".css-1cab8vv")
  // );

  // const projectField = inputSection.querySelectorAll(
  //   ".css-shuw93-singleValue"
  // );

  // inputSection
  //   .querySelector(".css-shuw93-singleValue")
  //   .querySelector("._1bsb1osq > div").innerText = "Team-A (TA)";

  /*  setTimeout(() => {
        // inputSection.querySelectorAll(".css-1cgksk3-container")[0].click();
        window.open(
          "https://https://selectiva.atlassian.net/jira/software/projects/TA/boards/70",
          "_blank"
        );
  
        console.log("clicked");
      }, 3000); */

  // Opening New jira project Board for creation of tickets
  const newTab = window.open(
    "https://selectiva.atlassian.net/jira/software/projects/TA/boards/70",
    "_blank"
  );
  // alert("Getting u into new tab");
  console.log("Getting u into new tab");

  console.log("The Open Tab : ", newTab);

  setTimeout(() => secondProjectPage(newTab, summary), 5000);

  /* 
      // console.log(
      //   "The project fields : ",
      //   inputSection.querySelectorAll(".css-1cgksk3-container")[0]
      // );
   */

  console.log("DONE With ScrapePage ");

  /*
    document.querySelectorAll(".css-1cab8vv")[1].value = summary;
  
    console.log("The input field", document.querySelector(".css-1cab8vv")[1]);
  
    console.log("The PROJECT ", document.querySelector(".css-os6h5y-control"));
    console.log(
      "The PROJECT ",
      document.querySelectorAll("._2lx21bp4 ._1e0c1txw ._1bsb1osq")
    );
  
    // console.log("THe modal : ", document.querySelector(".bjmwba-0 .dUYTXR"));
  
    console.log(
      "THe project input field: ",
      document.querySelector(".css-1tbvomj")
    );
  
    console.log("started");
  
    */
}
