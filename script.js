const container = document.getElementById("container");
const messageContainer = document.getElementById("message-container");
const table = document.getElementById("messages");
const table_body = document.getElementById("table-body");
const btn_add_message = document.getElementById("btn-add-message");
const loading_message = document.getElementById("loading-message");
const loading_images = document.getElementById("loading-images");
const inputImage = document.getElementById("upload-image-input");
const btnUpload = document.getElementById("btn-upload");
const apiUrl = "https://localhost:7285/api/Main";
const cdnUrl = "https://devstoragecdn.azureedge.net/";

peekMessage();
loadImages();

btnUpload.addEventListener("click", () => {
  if (inputImage.files.length > 0) {
    let data = new FormData();
    data.append("image", inputImage.files[0]);
    fetch(apiUrl + "/UploadImage", {
      method: "POST",
      mode: "cors",
      body: data,
    }).then((res) => {
      alert(res.json());
    });
  } else {
    alert("No File Selected");
  }
});

btn_add_message.addEventListener("click", () => {
  loading_message.style.display = "block";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: {},
    cache: "default",
  }).then((res) => {
    console.log(res);
    peekMessage();
  });
});

function loadImages() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => {
      container.innerHTML = "";
      loading_images.style.display = "block";
      json.forEach((file) => {
        let maindiv = document.createElement("div");
        let image = document.createElement("img");
        url = cdnUrl + "image" + "/" + file.name;
        image.src = url;
        image.width = 450;
        image.height = 300;
        maindiv.appendChild(image);
        container.appendChild(maindiv);
      });
      loading_images.style.display = "none";
    });
}

async function peekMessage() {
  table_body.innerHTML = ``;
  loading_message.style.display = "block";
  await fetch(`${apiUrl}/PeekMessage`)
    .then((res) => res.json())
    .then((data) => {
      data.value.forEach((message, index) => {
        let row = document.createElement("tr");
        let td_serialno = document.createElement("td");
        let td_id = document.createElement("td");
        let td_message = document.createElement("td");
        td_serialno.innerText = index + 1;
        td_serialno.width = 5 + "%";
        td_id.innerText = message.messageId;
        td_id.width = 30 + "%";
        td_message.innerText = message.messageText;
        row.appendChild(td_serialno);
        row.appendChild(td_id);
        row.appendChild(td_message);
        table_body.appendChild(row);
      });
    });
  loading_message.style.display = "none";
}
