const endpoint = 'http://localhost:3000/'

const eventSource = new EventSource(endpoint)

eventSource.onmessage = function (event) {
    let { data } = event

    if (typeof data === 'string') data = JSON.parse(data)

    console.table(data)

    const datetime = `${data.fullDate} ${data.hour} ${data.minutes} ${data.seconds}`

    document.getElementById('events').innerHTML += datetime + '<br><hr><br>'
}
