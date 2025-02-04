class Form {
  constructor(form) {
    this.form = form;
    this.labels = this.form.querySelectorAll("label");
    this.createWarning();

    this.name = {
      title: "name",
      input: this.form.querySelector(".name"),
      warning: this.form.querySelector("label[for='name'] > div .warningMsg"),
      isValid: false,
    };
    this.email = {
      title: "email",
      input: this.form.querySelector(".email"),
      warning: this.form.querySelector("label[for='email'] > div .warningMsg"),
      isValid: false,
    };
    this.password = {
      title: "password",
      input: this.form.querySelector(".password"),
      warning: this.form.querySelector(
        "label[for='password'] > div .warningMsg"
      ),
      isValid: false,
    };
    this.confirmPassword = {
      title: "confirmPassword",
      input: this.form.querySelector(".confirmPassword"),
      warning: this.form.querySelector(
        "label[for='confirmPassword'] > div .warningMsg"
      ),
      isValid: false,
    };

    this.inputs = [this.name, this.email, this.password, this.confirmPassword];

    this.submitBtn = this.form.querySelector(".submit");

    this.inputEventHandler();
  }

  createWarning() {
    this.labels.forEach((i) => {
      const warning = document.createElement("div");
      warning.classList.add("warning");

      const warningMsg = document.createElement("div");
      warningMsg.classList.add("warningMsg");

      warningMsg.textContent = "";

      warning.appendChild(warningMsg);

      i.appendChild(warning);
    });
  }

  inputEventHandler() {
    //Name Input Field
    this.name.input.addEventListener("input", () => {
      this.validate(this.name);
    });

    //Email Input Field
    this.email.input.addEventListener("input", () => {
      this.validate(this.email);
    });

    //Password Input Field
    this.password.input.addEventListener("input", () => {
      this.validate(this.password);
    });

    //Confirm Password Input Field
    this.confirmPassword.input.addEventListener("input", () => {
      this.validate(this.confirmPassword);
    });

    //Submit FORM button
    this.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let validInp = 0;
      this.inputs.forEach((i) => {
        if (i.isValid) {
          validInp++;
        } else {
          this.validate(i);
        }
      });

      if (validInp === this.inputs.length) {
        console.log("OK");
        this.form.querySelector(".inputs").classList.add("formValid");
      } else {
        console.log("Not ok");
        this.form.classList.add("shake");
        this.form.addEventListener("animationend", () =>
          this.form.classList.remove("shake")
        );
      }
    });
  }

  validate(obj) {
    switch (obj.title) {
      case "name":
        if (this.validityCheck(obj).isEmpty()) {
        } else if (this.validityCheck(obj).isShort()) {
        }
        break;
      case "email":
        if (this.validityCheck(obj).isEmpty()) {
        } else if (this.validityCheck(obj).isEmailCorrect()) {
        }
        break;
      case "password":
        if (this.validityCheck(obj).isEmpty()) {
        } else if (this.validityCheck(obj).isShort()) {
        }
        //Confirm password check
        if (
          this.validityCheck(this.confirmPassword).isPassConfirmed(
            this.confirmPassword,
            this.password
          )
        ) {
        }
        break;
      case "confirmPassword":
        if (this.validityCheck(obj).isEmpty()) {
        } else if (
          this.validityCheck(this.confirmPassword).isPassConfirmed(
            this.confirmPassword,
            this.password
          )
        ) {
        }
        break;
    }
  }

  //--- Validations ---
  validityCheck(obj) {
    const input = obj.input.value;
    const warning = obj.warning;

    function isEmpty() {
      if (input === "") {
        setInvalid(obj, "Field is required.");
        return true;
      } else {
        setValid(obj);
      }
    }

    function isShort() {
      const minLen = obj.input.getAttribute("minLength");
      if (input.split("").length < minLen) {
        setInvalid(obj, `Min ${minLen} characters.`);
        return true;
      } else {
        setValid(obj);
      }
    }

    function isEmailCorrect() {
      if (input.charAt(input.length - 1) === "@") {
        //Cant end with @
        setInvalid(obj, "Incorrect e-mail address.");
      } else if (input.charAt(input.length - 1) === ".") {
        //Cant end with dot
        setInvalid(obj, "Incorrect e-mail address.");
      } else if (!input.includes("@")) {
        //Needs @
        setInvalid(obj, "Incorrect e-mail address.");
      } else if (!input.includes(".")) {
        //Needs Dot
        setInvalid(obj, "Incorrect e-mail address.");
      } else {
        setValid(obj);
      }
    }

    function isPassConfirmed(obj1, obj2) {
      if (obj1.input.value != obj2.input.value) {
        setInvalid(obj1, "Password does not match.");
      } else if (!obj2.isValid) {
        setInvalid(obj1, "Password is not correct.");
      } else {
        setValid(obj1);
      }
    }

    //Validation DOM Visuals
    function setValid(obj) {
      obj.input.classList.remove("inputWarning");
      obj.input.classList.add("inputValid");
      obj.warning.textContent = "";
      obj.isValid = true;
    }

    function setInvalid(obj, msg = "ERROR") {
      obj.input.classList.add("inputWarning");
      obj.input.classList.remove("inputValid");
      obj.warning.textContent = msg;
      obj.isValid = false;
    }
    return { isEmpty, isShort, isEmailCorrect, isPassConfirmed };
  }
}

function initForms() {
  const forms = document.querySelectorAll("form");
  forms.forEach((f) => {
    new Form(f);
  });
}

initForms();
