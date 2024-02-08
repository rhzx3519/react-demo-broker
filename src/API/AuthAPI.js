
export async function SignIn(data) {
    const { email, password } = data
    const response = await fetch(`${process.env.REACT_APP_AUTH_SERVER_BASE_URL}/v1/login`, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    }).then(r => {
        if (r.status !== 200) {
            window.alert(r.status)
            return
        }
        return r.json()
    })
    return response
}

export async function Verify(token) {
    const response = await fetch(`${process.env.REACT_APP_AUTH_SERVER_BASE_URL}/v1/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }).then(r => {
        if (r.status !== 200) {
            return
        }
        return r.status
    })
    return response
}