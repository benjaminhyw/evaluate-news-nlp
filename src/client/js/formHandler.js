function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  // fetch("http://localhost:8081/test")
  //   .then((res) => res.json())
  //   .then(function (res) {
  //     document.getElementById("results").innerHTML = res.message;
  //   });

  fetch("http://localhost:8081/testing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formText),
  })
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
      document.getElementById("text-sent").innerHTML = res.text;
      document.getElementById("polarity").innerHTML = res.polarity;
      document.getElementById("subjectivity").innerHTML = res.subjectivity;
    });
}

export { handleSubmit };
