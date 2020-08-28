import Api from '../api'

class HostApi extends Api {
  constructor() {
    super('host')
  }
}

const hostApi = new HostApi()

export default hostApi
