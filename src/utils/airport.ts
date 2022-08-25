import axios from 'axios'

import { API_URLS } from '@/configs/api'
import { REACT_APP_APC_AUTH, REACT_APP_APC_AUTH_SECRET } from '@/configs/env'

export const getAirports = (keyword: string) => {
  const API_URL = `${API_URLS.AUTO_COMPLETE}?term=${
    keyword.substring(0, 10).replace(/[']/g, ' ') ?? ''
  }`

  return axios.post(API_URL, null, {
    headers: {
      'APC-Auth': REACT_APP_APC_AUTH as string,
      'APC-Auth-Secret': REACT_APP_APC_AUTH_SECRET as string
    }
  })
}

export const getSingleAirPort = (iata: string) => {
  const API_URL = `${API_URLS.SINGLE}?iata=${iata ?? ''}`

  return axios.post(API_URL, null, {
    headers: {
      'APC-Auth': REACT_APP_APC_AUTH as string,
      'APC-Auth-Secret': REACT_APP_APC_AUTH_SECRET as string
    }
  })
}
