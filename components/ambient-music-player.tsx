"use client"

import { useEffect, useRef, useState } from "react"
import { Music2, Volume2, VolumeX } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const BGM_STORAGE_KEY = "scentmind-bgm-settings"
const DEFAULT_VOLUME = 28

export function AmbientMusicPlayer() {
  const { language } = useLanguage()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)

  useEffect(() => {
    const savedSettings = window.localStorage.getItem(BGM_STORAGE_KEY)
    if (!savedSettings) {
      return
    }

    try {
      const parsed = JSON.parse(savedSettings) as { volume?: number; isMuted?: boolean }
      if (typeof parsed.volume === "number") {
        setVolume(Math.max(0, Math.min(100, parsed.volume)))
      }
      if (typeof parsed.isMuted === "boolean") {
        setIsMuted(parsed.isMuted)
      }
    } catch {
      window.localStorage.removeItem(BGM_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(BGM_STORAGE_KEY, JSON.stringify({ volume, isMuted }))
  }, [volume, isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    audio.volume = isMuted ? 0 : volume / 100
    audio.muted = isMuted
  }, [isMuted, volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    const startPlayback = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }

    const handleFirstInteraction = () => {
      startPlayback()
      window.removeEventListener("pointerdown", handleFirstInteraction)
      window.removeEventListener("keydown", handleFirstInteraction)
    }

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true })
    window.addEventListener("keydown", handleFirstInteraction, { once: true })

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction)
      window.removeEventListener("keydown", handleFirstInteraction)
    }
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
      return
    }

    audio.pause()
    setIsPlaying(false)
  }

  const toggleMute = () => {
    setIsMuted((current) => !current)
  }

  const labels = language === "zh"
    ? {
        title: "背景音乐",
        mute: "静音背景音乐",
        unmute: "恢复背景音乐",
        on: "有音量",
        off: "静音",
      }
    : {
        title: "BGM",
        mute: "Mute background music",
        unmute: "Unmute background music",
        on: "Sound on",
        off: "Muted",
      }

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient-piano-relaxing.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggleMute}
        className="fixed left-5 bottom-20 z-50 flex items-center gap-2 border border-border bg-background/86 px-3 py-2 text-sm text-foreground shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors hover:border-foreground"
        aria-label={isMuted ? labels.unmute : labels.mute}
      >
        <Music2 className="h-3.5 w-3.5 text-muted-foreground" />
        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        <span className="font-medium">{labels.title}</span>
        <span className="text-xs text-muted-foreground">{isMuted ? labels.off : labels.on}</span>
      </button>
    </>
  )
}