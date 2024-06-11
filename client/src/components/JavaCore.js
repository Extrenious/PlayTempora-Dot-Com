console.log("hey heyyyyyy")

document.addEventListener("DOMContentLoaded", function() {

  var bigTempora = document.getElementById("BigTempora");
  var medTempora = document.getElementById("MedTempora");
    
  console.log("Im here running in da javacore can ya see meh")


    function SetText(){ // Change the text content of the elements
      bigTempora.textContent = "Tempora";

      medTempora.textContent = "Become...";

    }

    setTimeout(SetText,3000)

    var medTemporaTexts = [
        "Ascend", "Overcome",   "Embrace Magic",   "Become Immortal",   "Become Magoi",   "Become a God",   "Surpass Omni",   "Rule the Cosmos",    "Harness Magic" , "Transcend" , "Defy" , "Conquer" , "Master the elements"
    ];


    function changeTextOnClick() {  
      var randomIndex = Math.floor(Math.random() * medTemporaTexts.length);
          medTempora.textContent = medTemporaTexts[randomIndex];
     }

    // Add an event listener to the button to change text on click
    bigTempora.addEventListener("click", changeTextOnClick);

 // Call changeTextOnClick function every 3 seconds
  let counter = 0;
  const intervalId = setInterval(() => {
      changeTextOnClick();
      counter++;
      if (counter >= 400 && bigTempora.textContent === "Tempora") {
        clearInterval(intervalId); // Stop the interval after 400 iterations
      }
  }, 3500);

});
