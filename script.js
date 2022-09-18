const mainText = document.getElementById('maintext_text');
const subtext = document.getElementById('subtext_text');
const venue = document.getElementById('venue_text');
const date = document.getElementById('date_value');
const time = document.getElementById('time_value');
const bottomline = document.getElementById('bottomline_text');
const background = document.getElementById('background_color');

const storage = (inTarget, inValue) => {
  if(!inValue || !inTarget) {
    return;
  }
  const storedValue = localStorage.getItem(inTarget);
  if(storedValue && storedValue === inValue) {
    return storedValue;
  }
  localStorage.setItem(inTarget, inValue);
  return inValue;
}

const targetFunctions = {
  'svg': {
    target: 'svg',
    display(value, options) {
      const elem = document.querySelector(`#${this.target}`);
      elem.setAttribute('width', options.width);
      elem.setAttribute('height', options.height);
    }
  },
  'maintext_text_display': {
    target: 'maintext_text_display',
    display(inValue) {
      const value = inValue
          ?? (storage(this.target, inValue)
          ? storage(this.target, inValue)
          : "maintext_text_display_placeholder");
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.textContent = value;
    }
  },
  'subtext_text_display': {
    target: 'subtext_text_display',
    display(inValue) {
      const value = inValue
          ?? (storage(this.target, inValue)
          ? storage(this.target, inValue)
          : "subtext_text_display_placeholder");
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.textContent = value;
    }
  },
  'venue_text_display': {
    target: 'venue_text_display',
    display(inValue) {
      const value = inValue
          ?? (storage(this.target, inValue)
          ? storage(this.target, inValue)
          : "venue_text_display_placeholder");
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.textContent = value;
    }
  },
  'date_value_display': {
    target: 'date_value_display',
    display(inValue) {
      const value = inValue
        ?? (storage(this.target, inValue)
          ? storage(this.target, inValue)
          : "date_value_display_placeholder");
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.textContent = value;
    }
  },
  'time_value_display': {
    target: 'time_value_display',
    display(inValue) {
      const value = inValue
        ?? (storage(this.target, inValue)
          ? storage(this.target, inValue)
          : "time_placeholder");
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.textContent = value;
    }
  },
  'bottomline_text_display': {
    target: 'bottomline_text_display',
    display(inValue) {
      const value = inValue
        ?? (storage(this.target, inValue)
          ? storage(this.target, inValue)
          : "bottomline_text_placeholder");
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.textContent = value;
    }
  },
  'background_color_display': {
    target: 'background_color_display',
    display(inValue = 'black') {
      const elem = document.querySelector(`#${this.target}`);
      if(!elem) {
        return;
      }
      elem.setAttribute('fill', inValue);
    }
  }
}

console.log(targetFunctions);

const inputs = [
  'maintext_text',
  'subtext_text',
  'venue_text',
  'date_value',
  'time_value',
  'bottomline_text',
  'background_color'
];

const inputDisplayMap = new Map();
for(let input of inputs) {
  inputDisplayMap.set(input, targetFunctions[`${input}_display`]);
}

console.log(inputDisplayMap);

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
