// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        let isValid = true;

        const datesInput = form.querySelector("#dates");

        const datesPattern =
          /^([A-Za-z]+:\d{1,2}(st|nd|rd|th)(,\d{1,2}(st|nd|rd|th))*;)+/;
        if (!datesPattern.test(datesInput.value)) {
          datesInput.setCustomValidity("Enter valid dates...");
          isValid = false;
        }

        console.log(isValid);

        if (!isValid || !form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
