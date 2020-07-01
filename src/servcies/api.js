class Api {
  constructor(baseUrl) {
    this.baseUrl = `http://localhost:8000/api/${baseUrl}`
  }

  async _fetch(url, method) {
    try {
      const payload = await fetch(
        url,
        {
          method: method
        }
      )
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
        `${this.baseUrl}/get_multi`,
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
      console.log('todo')
    } catch (err) {
      console.log('err', err)
    }
  }

  async create(payload) {
    try {
      console.log('todo')
    } catch (err) {
      console.log('err', err)
    }
  }

  async update(payload) {
    try {
      console.log('todo')
    } catch (err) {
      console.log('err', err)
    }
  }

  async delete(payload) {
    try {
      console.log('todo')
    } catch (err) {
      console.log('err', err)
    }
  }
}

export {
  Api
}