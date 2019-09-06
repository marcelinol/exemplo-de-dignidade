const query = `query getFaustaoTime {
  currentTime {
    minutes
  }
}`;
const url = "https://gloriosa-api.herokuapp.com/graphql";
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    query
  })
})
  .then(r => r.json())
  .then(data => handleSuccess(data.data));

function handleSuccess(data) {
  const formatter = new FaustaoTimeFormatter(data.currentTime.minutes);
  new DOMManipulator(document).writeCurrentFaustaoTime(
    formatter.formattedMinutes()
  );
}

class DOMManipulator {
  constructor(dom) {
    this.dom = dom;
  }

  writeCurrentFaustaoTime(text) {
    const element = this.dom.getElementById("time-in-faustao-format");
    element.innerText = text;
    return;
  }

  addFaustaoGloriousPicture() {
    const oGlorioso = new Image(); // Image constructor
    oGlorioso.src = `images/fausto${Math.floor(Math.random() * 5)}.jpg`;
    oGlorioso.alt = "Glorioso faustao";
    this.dom.getElementById("faustao-picture").appendChild(oGlorioso);
  }
}

class FaustaoTimeFormatter {
  constructor(minutes) {
    this.minutes = minutes;
  }

  // TODO: Add tests
  formattedMinutes() {
    if(this.minutes > 0) {
      return `${this.minutes} minutos depois das 8:07`;
    } else {
      return `${Math.abs(this.minutes)} minutos para as 8:07`;
    }
  }
}

new DOMManipulator(document).addFaustaoGloriousPicture();
