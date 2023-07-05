  module.exports = {
    isEmpty: function (value) {
      return value === undefined || value === null || value === '';
    },
    idEmpty: function (value, options) {
      if (value && value.length > 0) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  };
