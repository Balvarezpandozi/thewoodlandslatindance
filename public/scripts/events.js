document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("multiStepForm");
  const steps = form.querySelectorAll(".form-step");
  let currentStep = 0;

  function showStep(step) {
    steps.forEach((stepDiv, index) => {
      stepDiv.classList.toggle("d-none", index !== step);
    });
  }

  // Navigation buttons (Next / Previous)
  form.addEventListener("click", (e) => {
    if (e.target.classList.contains("next-btn")) {
      // Validate inputs on current step
      const inputs = steps[currentStep].querySelectorAll("select, input");
      for (let input of inputs) {
        if (!input.checkValidity()) {
          input.reportValidity();
          return;
        }
      }
      currentStep++;
      if (currentStep >= steps.length) currentStep = steps.length - 1; // safety check
      showStep(currentStep);
    } else if (e.target.classList.contains("prev-btn")) {
      currentStep--;
      if (currentStep < 0) currentStep = 0;
      showStep(currentStep);
    }
  });

  // Handle form submission with async fetch
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Build event data object
    const formData = new FormData(form);
    const eventData = {
      type: formData.get("type"),
      extra: formData.get("extra"),
      fullName: formData.get("fullName"),
      date: formData.get("date"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      guestCount: formData.get("guestCount"),
    };

    try {
      const response = await fetch("/salsa-bachata-event-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: eventData }),
      });

      await response.json();

      if (response.ok) {
        // Show success message and hide form
        document.querySelector("#formMessage").textContent =
          "Thank you! Your quote request has been received. Our 💃🏻team🕺🏻 will contact you ASAP!";
        document.querySelector("#formMessage").classList.remove("d-none");
        document.querySelector("#formMessage").classList.remove("alert-danger");
        document.querySelector("#formMessage").classList.add("alert-success");
        form.style.display = "none";
        form.reset();
      } else {
        // Show server error message
        document.querySelector("#formMessage").textContent =
          "Something went wrong. Please try again or contact us at +1 (281) 202-2058";
        document.querySelector("#formMessage").classList.remove("d-none");
        document
          .querySelector("#formMessage")
          .classList.remove("alert-success");
        document.querySelector("#formMessage").classList.add("alert-danger");
      }
    } catch (error) {
      // Show network error message
      document.querySelector("#formMessage").textContent =
        "Network error. Please try again later or contact us at +1 (281) 202-2058";
      document.querySelector("#formMessage").classList.remove("d-none");
      document.querySelector("#formMessage").classList.remove("alert-success");
      document.querySelector("#formMessage").classList.add("alert-danger");
    }
  });

  // Show initial step
  showStep(currentStep);
});
