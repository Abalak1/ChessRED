const personalInfoInputs = document.querySelectorAll(".perosnal-inputs");
const form = document.querySelector(".form");
const step1Box = document.querySelector(".one");
const backBtn = document.querySelector('.back');

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
    e.preventDefault();
    let valid = true;

    personalInfoInputs.forEach((input,) => {
        if (input.value.length == 0) {
            input.classList.add("invalid-input");

            valid = false;
        } else if (input.name == "name") {
            if (input.value.length <= 2) {
                input.classList.add("invalid-input");
                document.getElementById("xxx-1").style.display = "inline";
                valid = false;
            } if (input.value.length <= 2) {
                document.getElementById("xxx-1").style.display = "none";
            }
        } else if (input.name == "email") {
            if (!input.value.endsWith("@redberry.ge")) {
                input.classList.add("invalid-input");
                document.getElementById("xxx").style.display = "inline";
                valid = false;
            } if (input.value.endsWith("@redberry.ge")) {
                document.getElementById("xxx").style.display = "none";
            }
        } else if (input.name == "phone") {
            if (input.value.length !== 9) {
                input.classList.add("invalid-input");
                document.getElementById("xxx-2").style.display = "inline";
                valid = false;
            } if (input.value.length == 9) {
                document.getElementById("xxx-2").style.display = "none";
            }
        }
    });
    if (valid) {
        location.href = "./chessexperience.html";


    }
};



backBtn.addEventListener('click', (e) => {
    location.href = './main.html'
})

checkInputActive();
