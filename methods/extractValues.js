const extractValues = (array, keys) => {
    return array.reduce((acc, item) => {
      if (keys.includes(item.name)) {
        acc[item.name.toLowerCase()] = item.value;
      }
      return acc;
    }, {});
};
module.exports = extractValues
