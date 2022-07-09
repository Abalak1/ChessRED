const personalInfoInputs = document.querySelectorAll(".perosnal-inputs");
const form = document.querySelector(".form");
const step1Box = document.querySelector(".one");

const checkInputActive = () => {
    let isActive = false;
    personalInfoInputs.forEach((input) => {
        if (input.value) {
            isActive = true;
        }
    });
    if (isActive) {
        step1Box.classList.add("one-filled");
    } else {
        step1Box.classList.remove("step-active");
    }
};

let personalInfoFormData = {
    name: null,
    email: null,
    phone: null,
    date_of_birth: null,
};

const personalInfoLocalStorage = localStorage.getItem("personalInfoFormData");

if (personalInfoLocalStorage) {
    personalInfoFormData = JSON.parse(personalInfoLocalStorage);
}

personalInfoInputs.forEach((input) => {
    input.value = personalInfoFormData[input.name];
    input.addEventListener("input", (e) => {
        checkInputActive();
        input.classList.remove("invalid-input");

        personalInfoFormData[e.target.name] = e.target.value;
        localStorage.setItem(
            "personalInfoFormData",
            JSON.stringify(personalInfoFormData)
        );
    });
});

form.onsubmit = (e) => {
    console.log(e);
    e.preventDefault();
    let valid = true;
    personalInfoInputs.forEach((input) => {
        if (input.value.length == 0) {
            input.classList.add("invalid-input");
            console.log("This field is required ", input.name);
            valid = false;
        } else if (input.name == "name") {
            if (input.value.length <= 2) {
                input.classList.add("invalid-input");
                console.log("Name must be more than 2 letters long");
                valid = false;
            }
        } else if (input.name == "email") {
            if (!input.value.endsWith("@redberry.ge")) {
                input.classList.add("invalid-input");
                console.log("Email must be in redberry mail format");
                valid = false;
            }
        } else if (input.name == "phone") {
            if (input.value.length !== 9) {
                input.classList.add("invalid-input");
                console.log("Number length must be 9");
                valid = false;
            }
        }
    });
    if (valid) {
        location.href = "./chessexperience.html";
    }
};

checkInputActive();
