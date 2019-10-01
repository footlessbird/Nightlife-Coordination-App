module.exports.validateRegisterInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please type username";
  }
  if (password.trim() === "") {
    errors.password = "Please type password";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1 // errors.length < 1 === no error === valid
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please type username";
  }
  if (password.trim() === "") {
    errors.password = "Please type password";
  }
  return{
      errors,
      valid: Object.keys(errors).length < 1
  }
};
