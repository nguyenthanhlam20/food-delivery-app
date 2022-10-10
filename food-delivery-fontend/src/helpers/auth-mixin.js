export const validateInput = (params) => {
  const regex = params.regex;
  let response;

  if (params.value.trim() === "") {
    response = {
      status: false,
      message: `${params.name} is empty`,
    };
  } else {
    if (regex.test(params.value)) {
      response = {
        status: true,
        message: "",
      };
    } else {
      response = {
        status: false,
        message: `${params.name} must only include ${params.regexMessage}`,
      };
    }
  }

  return response;
};
