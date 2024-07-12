 // Get the modal element
 var modal = document.getElementById("myModal");

 // Get the close button element
 var closeButton = modal.querySelector(".modal-close");

 // When the user clicks on the close button or outside the modal, close it
 modal.addEventListener("click", function(event) {
   if (event.target === modal || event.target === closeButton) {
     modal.classList.remove("is-active");
   }
 });