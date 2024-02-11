"use client"

import { Rank } from '@/components/Rank';
import { WsConnection } from '@/components/WsConnection';
import React, { useEffect } from 'react';

export default function Home() {
    const [connecting, setConnecting] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [channel, setChannel] = React.useState(null)

    const displayMessage = React.useCallback(({ data } : never) => {
      setMessages(prevState => [...prevState, data]);
      console.log('mess: ' + messages)
    }, [setMessages]);

    const openChannel = React.useCallback((inChannel: any) => {
      setChannel(() => { return inChannel })
    }, [setChannel]);

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

      <Rank items={messages[0]?.votes}/>
    </div>
  );
}
