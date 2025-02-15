import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    submitButton: document.querySelector(".snackbar-button"),
    radioButtons: document.querySelectorAll('[type="radio"]'),
    fulfilledRadio: document.querySelector('[value="fulfilled"]'),
    rejectedRadio: document.querySelector('[value="rejected"]'),
    delayField: document.querySelector('.delay-field'),
    form: document.querySelector('.form'),
};

const { submitButton, radioButtons, fulfilledRadio, rejectedRadio, delayField, form } = refs;

console.log(document.querySelectorAll('[type="radio"]'));

form.addEventListener('submit', e => {
    const delay = delayField.value;
    const isFulfilled = fulfilledRadio.checked;
    e.preventDefault();
    createPromise(delay, isFulfilled);
});

function createPromise(delay, isFulfilled) {
    const promise = new Promise(() => {
        setTimeout(() => {
            if (isFulfilled) {
    iziToast.success({
    title: '✅',
        message: `Fulfilled promise in ${delay} ms`,
    icon: '',
}); 
            } else {
              iziToast.error({
    title: '❌',
                  message: `Rejected promise in ${delay}ms`,
    icon: '',
});  
            }
           
        }, delay);

    })
};