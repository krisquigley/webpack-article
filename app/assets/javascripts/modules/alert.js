export default (function () {
  let button = document.querySelector("button[data-behavior='alert']")
  button.addEventListener('click', showAlert)

  function showAlert () {
    alert('hi')
  }
})()
