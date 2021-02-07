import useSWR from 'swr'
import { fetcher } from '@/actions'
import axios from 'axios'

export const useGetAllItems = () => {
  const { data, error, ...rest } = useSWR('/api/items', fetcher)

  return { data, error, loading: !data && !error, ...rest }
}

export const useGetItemById = id => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/posts/${id}` : null,
    fetcher
  )
  return { data, error, loading: !data && !error, ...rest }
}

export const useCreateItem = async (
  code,
  name,
  type,
  opnQty,
  priceRate,
  valueRate,
  unit,
  warehouse,
  status,
  group,
  image,
  notes
) => {
  const res = await axios.post('/api/items', {
    code,
    name,
    type,
    opnQty,
    priceRate,
    valueRate,
    unit,
    warehouse,
    status,
    group,
    image,
    notes
  })

  return { error: res.data.error, data: res.data.data }
}
