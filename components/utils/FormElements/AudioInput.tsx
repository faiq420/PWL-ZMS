"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Trash2, RotateCcw, Volume2, VolumeX } from "lucide-react";

export type AudioInputProps = {
  label?: string;
  initialUrl?: string;
  onFileChange?: (file: File | null) => void;
};

const CustomAudioInput: React.FC<AudioInputProps> = ({
  label = "Upload Audio",
  initialUrl,
  onFileChange,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(initialUrl || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setAudioUrl(initialUrl || null);
  }, [initialUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [audioUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      setAudioFile(file);
      setAudioUrl(url);
      setIsPlaying(false);
      setCurrentTime(0);
      onFileChange?.(file);
    }
  };

  const handleRemove = () => {
    setAudioFile(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
    onFileChange?.(null);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    return isNaN(time)
      ? "0:00"
      : `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`;
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-5 shadow">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {audioUrl ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
                className="text-gray-700 hover:text-black"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <span className="text-sm font-mono text-gray-600">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRemove}
                className="text-red-500 hover:text-red-700"
                title="Remove Audio"
              >
                <Trash2 size={14} />
              </button>
              <label
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                title="Replace Audio"
              >
                <RotateCcw size={14} />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-blue-500"
          />

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              className="text-gray-600 hover:text-black"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="accent-blue-500 w-28"
            />
          </div>

          <audio
            key={audioUrl}
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-6">
          <label className="cursor-pointer text-blue-600 hover:text-blue-800">
            <span className="text-sm underline">Click to upload audio</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-400 mt-2">
            Accepted: .mp3, .wav, .aac
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomAudioInput;
