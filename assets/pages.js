document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = contactForm.querySelector(".form-status");
    const button = contactForm.querySelector("button[type='submit']");
    status.textContent = "Sending...";
    button.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      contactForm.reset();
      status.textContent = "Thanks! Your message has been sent to Long Branch Farms.";
    } catch (error) {
      status.textContent = "We could not send that message. Please email longbranchfarmsky@gmail.com instead.";
    } finally {
      button.disabled = false;
    }
  });
}

