const request = async () => {
  try {
    const res = await fetch(process.env.REQUEST_URL)
    return await res.json()
  } catch (e) {
    console.error(e.message)
    return []
  }
}

export default request
