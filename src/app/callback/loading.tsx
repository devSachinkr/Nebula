import { Loader } from '@/components/loader'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <Loader loading={true}>
      <div>...</div>
    </Loader>
  )
}

export default loading