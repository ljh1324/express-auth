const wrapper = {}

wrapper.asyncTrycatch = asyncFn => {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
}

wrapper.promise = fn => {
  return new Promise(fn);
}

module.exports = wrapper;