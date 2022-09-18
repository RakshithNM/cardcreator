const mainText = document.getElementById('maintext_text');
const subtext = document.getElementById('subtext_text');
const venue = document.getElementById('venue_text');
const date = document.getElementById('date_value');
const time = document.getElementById('time_value');
const bottomline = document.getElementById('bottomline_text');
const background = document.getElementById('card_container');

const storage = (inTarget, inValue) => {
  if(!inValue || !inTarget) {
    return;
  }
  try {
    const storedValue = localStorage.getItem(inTarget);
    if(storedValue && storedValue === inValue) {
      return storedValue;
    }
    localStorage.setItem(inTarget, inValue);
    return inValue;
  }
  catch {
    return;
  }
}

function display(inValue) {
  const value = inValue
    ?? (storage(this.target, inValue)
      ? storage(this.target, inValue)
      : `${this.target}`);
  const elem = document.querySelector(`#${this.target}`);
  if(!elem) {
    return;
  }
  elem.textContent = value;
};

const targetFunctions = {
  'svg': {
    target: 'svg',
    display: display
  },
  'maintext_text_display': {
    target: 'maintext_text_display',
    display: display
  },
  'subtext_text_display': {
    target: 'subtext_text_display',
    display: display
  },
  'venue_text_display': {
    target: 'venue_text_display',
    display: display
  },
  'date_value_display': {
    target: 'date_value_display',
    display: display
  },
  'time_value_display': {
    target: 'time_value_display',
    display: display
  },
  'bottomline_text_display': {
    target: 'bottomline_text_display',
    display: display
  },
  'card_display': {
    target: 'card_display',
    display(inValue = 'black') {
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.style.backgroundColor = inValue;
    }
  }
}

const inputs = [
  'maintext_text',
  'subtext_text',
  'venue_text',
  'date_value',
  'time_value',
  'bottomline_text',
  'card'
];

const inputDisplayMap = new Map();
for(let input of inputs) {
  inputDisplayMap.set(input, targetFunctions[`${input}_display`]);
}

const render = (inTarget, inValue) => {
  const targetDisplay = inputDisplayMap.get(inTarget);
  if(!targetDisplay) {
    return;
  }
  targetDisplay.display(inValue);
}

for(let input of inputs) {
  render(input);
}

const form = document.getElementById('form');
form.addEventListener('input', function(e) {
  const target = e?.target?.id;
  const value = e?.target?.value;
  storage(target, value);
  render(target, value);
});
