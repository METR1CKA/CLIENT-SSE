const endpoint = 'http://localhost:3000/'

const eventSource = new EventSource(endpoint)

const eventsContainer = document.getElementById('events')

const spinner = document.getElementById('spinner')

function pulseSpinner() {
    spinner.classList.add('hidden')

    setTimeout(() => spinner.classList.remove('hidden'), 1_000)
}

eventSource.onmessage = ({ data }) => {
    let parsed

    try {
        parsed = JSON.parse(data)
    } catch {
        return void console.error('JSON inválido:', data)
    }

    console.table(parsed)

    const { fullDate, hour, minutes, seconds } = parsed

    const timestamp = `${fullDate} ${hour}:${minutes}:${seconds}`

    const details = `Hora: ${hour}, Minutos: ${minutes}, Segundos: ${seconds}`

    const item = document.createElement('article')

    item.className = 'p-4 bg-gray-50 rounded-lg border border-gray-200'
    item.innerHTML = `
        <div class="text-blue-600 font-medium">${timestamp}</div>
        <div class="text-sm text-gray-600 mt-1">${details}</div>
    `

    eventsContainer.prepend(item)

    pulseSpinner()
}

eventSource.onerror = (err) => {
    console.error('Error de conexión SSE:', err)

    const errorMsg = document.createElement('div')

    errorMsg.textContent = '⚠️ No se pudo recibir datos del servidor.'
    errorMsg.className = 'p-3 bg-red-100 text-red-700 rounded-lg'

    eventsContainer.prepend(errorMsg)
}
