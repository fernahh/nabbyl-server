module.exports = (type, response) => ({
  then: (successCallback, errorCallback) =>
    handleResponse(type, response, {
      successCallback,
      errorCallback
    })
})

function handleResponse(type, response, options) {
  return type === 'success'
    ? options.successCallback(response)
    : options.errorCallback(response)
}
