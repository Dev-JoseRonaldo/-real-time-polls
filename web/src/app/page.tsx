"use client"

import { WsConnection } from '@/components/WsConnection';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [connecting, setConnecting] = useState(true);
    const [status, setStatus] = useState('');
    const [channel, setChannel] = useState(null)

    const [poll, setPoll] = useState();

    const displayMessage = useCallback(( data  : never) => {
      const newPoll = poll?.options.map((option: any) => {
        if (option.id === data?.pollOptionId && option.score !== data.votes ) {
          return { ...option, score: data.votes }
        }
        return option
      })
      setPoll(newPoll)
    }, [setPoll]);

    const openChannel = useCallback((inChannel: any) => {
      setChannel(() => { return inChannel })
    }, [setChannel]);

    const handleFetch = async () => {
      try {
        const response = await axios.get('http://localhost:3333/polls/1cab2ea9-daa5-47f0-9296-f49b50179fa8')
        const data = response.data.poll
        setPoll(data)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      handleFetch()
    }, [poll])

  return (
    <div>
      <WsConnection
        url="ws://localhost:3333/polls/1cab2ea9-daa5-47f0-9296-f49b50179fa8/results"
        onOpen={() => setConnecting(false)}
        onChannelOpened={openChannel}
        onMessage={displayMessage}
        onClose={() => { setConnecting(true); setStatus('Disconnected') }}
        onError={(error: any) => { setConnecting(true); setStatus(error.message) }}
      />

      <div key={poll?.id}>
        {poll?.id}
        {poll?.title}

        {poll?.options?.map((option: any) => (
          <div key={option.id}>
            {option.title} -
            {option.score}
          </div>
        ))}

      </div>
    </div>
  );
}
