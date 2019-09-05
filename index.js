const query = `query getFaustaoTime {
  currentTime {
    minutes
  }
}`;
const url = 'https://gloriosa-api.herokuapp.com/graphql'
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query
  })
})
  .then(r => r.json())
  .then(data => handleSuccess(data.data))

function handleSuccess(data) {
  const formatter = new FaustaoTimeFormatter(data.currentTime.minutes)
  new DOMManipulator(document).writeCurrentFaustaoTime(formatter.formattedMinutes())
}

class DOMManipulator {
  constructor(dom) {
    this.dom = dom
  }

  writeCurrentFaustaoTime(text) {
    const element = this.dom.getElementById("time-in-faustao-format")
    element.innerText = text
    return
  }
}

class FaustaoTimeFormatter {
  constructor(minutes) {
    this.minutes = minutes
  }

  // TODO: Add tests
  formattedMinutes() {
    return `${this.minutes} minutos depois das 8:07 bicho.`
  }
}
