const ERRORS = {
  IS_REQUIRED: `Field is required. `,
  PRICE_IS_LESS: `Must be greater than 0.`,
  IS_NAN: `Must be a number`,
  IS_SHORTER_THAN(min) {
    return `Must be at least ${min} characters (no spaces). `;
  },
  IS_LONGER_THAN(max) {
    return `Must be shorter than ${max} characters.`;
  },
};

const RULES = {
  TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 25,
  },
  PRICE: {
    MIN: 1,
  },
  DESCRIPTION: {
    MIN_LENGTH: 25,
  },
};

const getExactLength = (str) => {
  return str ? str.trim().length : null;
};

const validateProductForm = (values) => {
  const errors = {};

  const titleLength = getExactLength(values.title);
  if (!values.title) {
    errors.title = ERRORS.IS_REQUIRED;
  } else if (titleLength < RULES.TITLE.MIN_LENGTH) {
    errors.title = ERRORS.IS_SHORTER_THAN(RULES.TITLE.MIN_LENGTH);
  } else if (titleLength >= RULES.TITLE.MAX_LENGTH) {
    errors.title = ERRORS.IS_LONGER_THAN(RULES.TITLE.MAX_LENGTH);
  }

  const price = values.price;
  if (!String(price).length) {
    errors.price = ERRORS.IS_REQUIRED;
  } else if (isNaN(price)) {
    errors.price = ERRORS.IS_NAN;
  } else if (price < RULES.PRICE.MIN) {
    errors.price = ERRORS.PRICE_IS_LESS;
  }

  const descriptionLength = getExactLength(values.description);
  if (!values.description) {
    errors.description = ERRORS.IS_REQUIRED;
  } else if (descriptionLength < RULES.DESCRIPTION.MIN_LENGTH) {
    errors.description = ERRORS.IS_SHORTER_THAN(RULES.DESCRIPTION.MIN_LENGTH);
  }

  return errors;
};

export default validateProductForm;
