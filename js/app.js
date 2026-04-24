// get all html elements

const form = document.getElementById("shorten-form");
const input = document.getElementById("url-input");
const resultsContainer = document.getElementById("results");

// array for end results even after refresh

let history = JSON.parse(localStorage.getItem("history")) || [];
renderResults();

// handle submit

const handleSubmit = async (e) => {
  e.preventDefault();

  const url = input.value.trim();

  // empty input
  if (!url) {
    input.classList.add(
      "border",
      "border-2",
      "border-danger",
      "placeholder-red",
    );
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Please add a link";
    errorMessage.className =
      "text-danger error-font fst-italic position-absolute mt-1";

    // when user starts typing again
    input.addEventListener("input", () => {
      input.classList.remove("border-danger");
    });

    const existingError = document.querySelector(".error-message");
    if (existingError) existingError.remove();

    errorMessage.classList.add("error-message");

    // input.parentElement.appendChild(errorMessage);
    document.getElementById("input-wrapper").appendChild(errorMessage);
    console.log("missing url string");
    return;
  }

  try {
    const response = await axios.post(
      "/api/shorten",
      new URLSearchParams({ url }),
    );

    if (!response || !response.data) {
      throw new Error("No response from API");
    }

    const short_url = response.data.result_url;
    history.push({ original: url, short: short_url });

    // set to locals storage to access even after refresh

    localStorage.setItem("history", JSON.stringify(history));

    renderResults();
    input.value = "";
    console.log("this is working");
  } catch (error) {
    console.error("possible cors error", error);
  }
};

form.addEventListener("submit", handleSubmit);

function renderResults() {
  resultsContainer.innerHTML = "";

  history.forEach((item) => {
    // result div
    const wrapper = document.createElement("div");
    wrapper.className =
      "d-flex flex-column flex-md-row justify-content-between align-items-center bg-light p-3 rounded mb-3";

    //  original url string div
    const originalDiv = document.createElement("div");
    originalDiv.textContent = item.original;
    originalDiv.className = "result-font text-break flex-grow-1";

    // resultDiv

    const resultDiv = document.createElement("div");
    resultDiv.className = "d-flex align-items-center gap-3 mt-2 mt-md-0";

    const link = document.createElement("a");
    link.textContent = item.short;
    link.href = item.short;
    link.target = "_blank";
    link.className = "result-font  short-url text-break flex-grow-1";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.className = "btn  copy-btn px-3 btn-sm";

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(item.short);
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied-btn");
    });

    // append everything

    resultDiv.appendChild(link);
    resultDiv.appendChild(copyBtn);

    wrapper.appendChild(originalDiv);
    wrapper.appendChild(resultDiv);

    resultsContainer.appendChild(wrapper);
  });
}
