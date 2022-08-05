import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';


export const stockApiSlice = createApi({
  reducerPath: 'stockApiSlice',
  endpoints: builder => ({
    getStocks: builder.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(args, { updateCachedData, cacheEntryRemoved }) {
        const socket = io('http://localhost:4000')
        
        socket.emit('start', args[0]) 
        
        if (args[1] !== '') {
          socket.emit('add', args[1])
        }

        if (args[2] !== '') {
          socket.emit('delete', args[2])
        }
        
        socket.on('ticker', (data) => {
      
          updateCachedData((draft) => {
            draft.push(data)
            if (draft.length > 1) {
              draft.shift()
              return draft
            }
          })
        })
        await cacheEntryRemoved
      }
    }),
  }),
})


export const { useGetStocksQuery } = stockApiSlice;