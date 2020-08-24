class Api {
  constructor(baseUrl) {
    this.baseUrl = `/api/${baseUrl}`
  }

  async _fetch(url, method, body=false) {
    try {
      let payload = null
      if (!body) {
        payload = await fetch(
          this.baseUrl + url,
          {
            method: method
          }
        )
      } else {
        payload = await fetch(
          this.baseUrl + url,
          {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        )
      }
      const res = await payload.json()
      console.log(payload)
      return res
    } catch (err) {
      console.log('err', err)
    }
  }

  async get_multi(limit=80) {
    try {
      const res = await this._fetch(
        '/get_multi',
        'GET'
      )
      console.log(res)
      return res
    } catch (err) {
      console.log('err', err)
    }
  }

  async get(id) {
    try {
      const res = await this._fetch(
        `/get/${id}`,
        'GET'
      )
      return res
    } catch (err) {
      console.log('err', err)
    }
  }

  async search(query) {
    try {
      const res = await this._fetch(
        `/search?name=${query}`,
        'GET'
      )
      return res
    } catch (err) {
      console.log('err', err)
    }
  }

  async create(payload) {
    try {
      const res = await this._fetch(
        '/create',
        'POST',
        payload
      )
      return res
    } catch (err) {
      console.log('err', err)
    }
  }

  async update(id, payload) {
    try {
      const res = await this._fetch(
        `/update/${id}`,
        'PUT',
        payload
      )
      return res
    } catch (err) {
      console.log('err', err)
    }
  }

  async delete(id) {
    try {
      const res = await this._fetch(
        `/delete/${id}`,
        'DELETE'
      )
      return res
    } catch (err) {
      console.log('err', err)
    }
  }
}

export {
  Api
}