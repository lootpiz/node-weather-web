const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    if (!location) {
        messageOne.textContent = 'No value provided'
    } else {
        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                }
                messageOne.textContent = data.summary
                messageTwo.textContent = data.temperature
            })
        })
    }
})