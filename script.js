const form = document.querySelector(`form`);
const button = document.querySelector(`button`);
const resettor = document.querySelector(`#resettor`);
const historyDiv = document.querySelector(`#history`);

form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  if (form.elements.query.value === ``) {
    alert(`Give Me Some Problem atleast 😖`);
  } else {
    calculator();
    setInterval(() => {
      button.innerText = `Evaluate`;
      button.style.backgroundColor = `#ffffff`;
    }, 3500);
  }
});

const calculator = async () => {
  const expression = encodeURIComponent(form.elements.query.value);
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  try {
    const response = await axios.get(
      `https://api.mathjs.org/v4/?expr=${expression}`,
      config
    );
    addingHistory();
    button.style.backgroundColor = `#aaf683`;
    form.elements.query.value = response.data;
    button.innerText = `Success`;
  } catch (error) {
    console.log(`Error 😢\n${error}`);
    button.innerText = `Math Error`;
    button.style.backgroundColor = `#ff0000`;
    form.reset();
  }
};

const addingHistory = () => {
  const history = document.createElement(`div`);
  history.classList.add(`insideHistory`, `slide-in-blurred-top`);
  history.innerText = form.elements.query.value;
  historyDiv.append(history);

  resettor.addEventListener(`click`, () => {
    history.classList.remove(`slide-in-blurred-top`);
    history.classList.toggle(`slide-out-blurred-top`);
    setTimeout(() => {
      history.remove();
    }, 470);
  });
};

window.addEventListener(`keydown`, (action) => {
  if (action.key === `Alt`) {
    form.reset();
    button.innerText = `Evaluate`;
    button.style.backgroundColor = `#ffffff`;
  }
  if (action.key === `Tab`) {
    document.querySelector(`input`).select();
    document.execCommand("copy");
  }
});
