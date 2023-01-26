import { useRouter } from 'next/router'
import React from 'react'
import { ReceiptBox } from './elements/ReceiptBox'

export const ReceiptsPage = () => {
  const { query } = useRouter()

  const hasParams = query.network && query.address && query.hash

  return (
    <>
      {hasParams && (
        <>
          <div className="flex flex-col items-center">
            <h1 className="mb-10 text-4xl font-bold">Receipt details</h1>
            <ReceiptBox
              lockAddress={query!.address as string}
              network={Number(query.network)}
              hash={query.hash as string}
            />
          </div>
        </>
      )}
    </>
  )
}

export default ReceiptsPage
