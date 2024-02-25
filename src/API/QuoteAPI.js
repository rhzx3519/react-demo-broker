export async function GetQuote(symbols, exchange) {
    const localUser = JSON.parse(localStorage.getItem("user"))
    const token = localUser?.token

    try {
        const uri = `${process.env.REACT_APP_QUOTE_SERVER_BASE_URL}/v1/quote?symbols=${symbols}&exchange=${exchange}`
        const response = await fetch(uri, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + token
            },
        })
        if (!response.ok) {
            return
        }
        const r = await response.json()
        return r
    } catch (e) {
        console.log(e)
    }
}