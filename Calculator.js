const form = document.querySelector(`form`);
const button = document.querySelector(`button`);

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
  const config = { headers: { "content-type": "application/json" } };
  try {
    const response = await axios.get(
      `http://api.mathjs.org/v4/?expr=${expression}`,
      config
    );
    form.elements.query.value = response.data;
    button.innerText = `Success`;
    button.style.backgroundColor = `#aaf683`;
  } catch (error) {
    console.log(`Error 😢\n${error}`);
    button.innerText = `Math Error`;
    button.style.backgroundColor = `#ff0000`;
    form.reset()
  }
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