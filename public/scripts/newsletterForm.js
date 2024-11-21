

//Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission if invalid
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                let isValid = true;

                // Custom validation for the phone number
                const phoneInput = form.querySelector('#phoneNumber');
                const phonePattern = /^\d{10}$/; // Accepts exactly 10 digits
                const areaCode = phoneInput.value.slice(0,3);
                const exchangeCode = phoneInput.value.slice(3,6);
                //US rules for invalid area code
                const invalidAreaCode = areaCode[0] == '0' || areaCode[0] == '1' || areaCode[1] == '9';
                //US rules for invalid exchange code
                const invalidExchangeCode = exchangeCode[0] == '0' || exchangeCode[0] == '1';
                if (!phonePattern.test(phoneInput.value) || invalidAreaCode || invalidExchangeCode) {
                    phoneInput.setCustomValidity('Enter a valid phone number. Just the digits. Ex: 5555555555');
                    isValid = false;
                } else {
                    phoneInput.setCustomValidity('');
                }

                // Custom validation for names
                const nameInputs = form.querySelectorAll('#firstName, #lastName');
                nameInputs.forEach(input => {
                    if (input.value.trim() === '') {
                        input.setCustomValidity('Name cannot be empty');
                        isValid = false;
                    } else {
                        input.setCustomValidity('');
                    }
                });

                const emailInput = form.querySelector("#inputEmail");
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(emailInput.value)) {
                    emailInput.setCustomValidity('Enter valid email.');
                    isValid = false;
                } else {
                    emailInput.setCustomValidity('');
                }

                console.log(isValid);
                
                // If the form is invalid, prevent submission
                if (!isValid || form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation');
//       // Loop over them and prevent submission
//       var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener('submit', function(event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add('was-validated');
//         }, false);
//       });
//     }, false);
//   })();