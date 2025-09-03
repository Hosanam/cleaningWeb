function sendMail() {
  let parms = {
    name: document.getElementById("first-name").value,
    subject: document.getElementById("subject").value,
    email: document.getElementById("email").value,
    message: document.getElementById("quick-message").value,
  };

  emailjs
    .send("service_cwyah0r", "template_kjdknxg", parms)
    .then(alert("Email sent!!"));
}
