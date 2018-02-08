import { observable, action } from "mobx";

class LoginStore {
  @observable email = "";
  @observable password = "";
  @observable isValid = false;
  @observable emailError = "";
  @observable passwordError = "";

  @action
  emailOnChange(id) {
    this.email = id;
    this.validateEmail();
  }

  @action
  validateEmail() {
    const emailPatter = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const required = this.email ? undefined : "Required";
    this.emailError = required
      ? required
      : emailPatter.test(this.email) ? undefined : "Invalid email address";
  }

  @action
  passwordOnChange(pwd) {
    this.password = pwd;
    this.validatePassword();
  }

  @action
  validatePassword() {
    const alphaNumeric = /[^a-zA-Z0-9 ]/i.test(this.password)
      ? "Only alphanumeric characters"
      : undefined;
    const maxLength =
      this.password.length > 15 ? "Must be 15 characters or less" : undefined;
    const minLength =
      this.password.length < 8 ? "Must be 8 characters or more" : undefined;
    const required = this.password ? undefined : "Required";
    this.passwordError = required
      ? required
      : alphaNumeric ? alphaNumeric : maxLength ? maxLength : minLength;
  }

  @action
  validateForm() {
    if (this.emailError === undefined && this.passwordError === undefined) {
      this.isValid = true;
    }
  }

  @action
  clearStore() {
    this.email = "";
    this.isValid = false;
    this.emailError = "";
    this.password = "";
    this.passwordError = "";
  }
}

export default LoginStore;
