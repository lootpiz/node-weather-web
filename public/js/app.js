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
        return messageOne.textContent = 'No value provided'
    } else {
        fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    return messageOne.textContent = data.error
                }
                messageOne.textContent = data.summary
                messageTwo.textContent = data.temperature
            })
        })
    }
})