export class Validation {
  constructor(errors) {
    this.errors = errors;
  }
  
  validate(event) {
    const [input1, input2] = event.currentTarget.elements;
  
    if (!input1.validity.valid || !input2.validity.valid) {
      this.checkEmptyInput(event, input1, input2);
      this.checkRange(event, input1, input2);
      this.checkCorrectInput(event, input1, input2);
      this.checkLink(event, input2);
      this.disableButton(event);
    } else {
      this.removeErrors(event);
      this.activateButton(event);
    }
  }
  
  checkEmptyInput(event, ...inputs) {
    if (event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.emptyInput;
        }
      });
    }
  }

  checkRange(event, ...inputs) {
    if (event.target.value.length === 1 || event.target.value.length > 30) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.outOfRange;
        }
      });
    }
  }

  checkCorrectInput(event, ...inputs) {
    if (event.target.validity.valid) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.correctInput;
        }
      });
    }
  }
  
  checkLink(event, ...inputs) {
    if (!event.target.validity.valid && event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.emptyInput;
        }
      });
    } else if (!event.target.validity.valid && event.target.name === 'link') {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.invalidLink;
        }
      });
    }
  }
  
  removeErrors(event) {
    event.currentTarget.querySelectorAll('.error').forEach(error => {
      error.textContent = '';
    });
  }
  
  disableButton(event) {
    const button = event.currentTarget.querySelector('button');
    button.setAttribute('disabled', true);
    button.classList.add('button_disabled');
    button.classList.remove('button_active');
  }
  
  activateButton(event) {
    const button = event.currentTarget.querySelector('button');
    button.removeAttribute('disabled');
    button.classList.remove('button_disabled');
    button.classList.add('button_active');
  }
}