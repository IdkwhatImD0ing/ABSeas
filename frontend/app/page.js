'use client'
import {useState, useRef, useEffect} from 'react'
import Home from '@/components/Home/Home'
import {Box} from '@mui/material'
import FlashcardsPage from '@/components/flashcards/flashcardPage'
import SongContext from '@/components/SongContext'
import LyricsPage from '@/components/lyricsPage'
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}
export default function Default() {
  const [song, setSong] = useState({
    isFinished: false,
    lyrics: '',
    songAudio: null,
    transcript: [],
    metadata: [],
    mediaSource: null,
    sourceBuffer: null,
  })
  const [page, setPage] = useState(0) // 0 = Home, 1 = Song, 2 = Flashcards
  const ws = useRef(null) // Initialize ws ref to null for WebSocket
  const audioDataQueue = useRef([]) // Initialize audioDataQueue ref to empty array
  const sourceBuffer = useRef(null)

  useEffect(() => {
    const ms = new MediaSource()
    setSong((prev) => ({...prev, mediaSource: ms}))

    ms.addEventListener('sourceopen', () => {
      try {
        const mimeType = 'audio/mpeg'
        const sb = ms.addSourceBuffer(mimeType)
        sourceBuffer.current = sb
        console.log('SourceBuffer created:', sb)

        // Once the SourceBuffer is ready, process any queued audio data
        audioDataQueue.current.forEach((data) => {
          console.log('Processing queued audio data')
          sb.appendBuffer(data)
        })
        // Clear the queue
        audioDataQueue.current = []

        // Listen for when the SourceBuffer is ready for more data
        sb.addEventListener('updateend', () => {
          if (audioDataQueue.current.length > 0) {
            console.log('Processing queued audio data')
            const nextData = audioDataQueue.current.shift()
            if (!nextData) {
              console.error('Error getting next audio data')
              return
            }
            sb.appendBuffer(nextData)
            audioDataQueue.current = audioDataQueue.current.slice(1) // Remove the first element
          }
        })
      } catch (e) {
        console.error('Error creating SourceBuffer:', e)
      }
    })
  }, [])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws?client_id=123')

    socket.onopen = () => console.log('WebSocket Connected')
    socket.onerror = (error) => console.log('WebSocket Error:', error)
    socket.onclose = () => console.log('WebSocket Disconnected')

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.timestamps) {
        console.log('Received timestamps:', data.timestamps)
        setSong((prev) => ({
          ...prev,
          isFinished: true,
          transcript: data.timestamps,
        }))
      }
      if (data.lyrics) {
        console.log('Received lyrics:', data.lyrics)
        setSong((prev) => ({...prev, lyrics: data.lyrics}))
      }
      if (data.metadata) {
        console.log('Received metadata:')
        setSong((prev) => ({...prev, metadata: data.metadata}))
      }
      if (data.audio) {
        if (page === 0) {
          console.log('Received audio data')
          setPage(1)
        }
        const audioArrayBuffer = base64ToArrayBuffer(data.audio)
        if (sourceBuffer.current && !sourceBuffer.current.updating) {
          sourceBuffer.current.appendBuffer(audioArrayBuffer)
        } else {
          // Queue the data if the SourceBuffer isn't ready
          console.log('Queueing audio data')
          audioDataQueue.current.push(audioArrayBuffer)
        }
      }
    }

    ws.current = socket

    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  function sendData(data) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log('Sending data:', data)
      ws.current.send(JSON.stringify(data))
    } else {
      console.error('WebSocket not connected')
    }
  }
  return (
    <SongContext.Provider value={{song, setSong}}>
      <Box width="100vw" height="100vh" top={0} left={0} overflow={'hidden'}>
        {page === 0 && <Home sendData={sendData} />}
        {page === 1 && <LyricsPage setPage={setPage} />}
        {page === 2 && <FlashcardsPage />}
      </Box>
    </SongContext.Provider>
  )
}
