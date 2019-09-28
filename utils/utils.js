const utils = {

}

utils.isEmpty = (value) => {
  return (
    value === 'null' ||
    value === 'undefined' ||
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

utils.hasSameValues = (obj1, obj2) => {
  const result = Object.keys(obj2).every(key => {
    if (obj1.hasOwnProperty(key)) {
      return obj1[key] === obj2[key];
    }
    return false;
  });

  return result;
}

utils.cloneObject = (obj) => {
  if (obj === null || typeof (obj) !== 'object')
    return obj;

  let clone = {};

  Object.keys(obj).forEach(key => {
    clone[key] = utils.cloneObject(obj[key]);
  });

  return clone;
}

utils.successTrue = data => {
  return {
    success: true,
    message: null,
    errors: null,
    data: data
  };
};

utils.successFalse = (err, message = 'fail') => {
  return {
    success: false,
    message: message,
    errors: (err) ? err : null,
    data: null
  };
};

utils.removeEmptyValues = (obj) => {
  const newObj = Object.keys(obj).reduce((acc, key) => {
    if (!utils.isEmpty(obj[key])) {
      acc[key] = utils.cloneObject(obj[key]);
      return acc;
    }
    return acc;
  }, {})

  return newObj;
}

module.exports = utils;