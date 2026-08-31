"use client";

import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon";

const reels = [
  { title: "AP Econ 1.0", note: "A fast field-note explainer", src: "/reels/field-note-01.mp4", poster: "/reels/field-note-01-cover.webp", tone: "blue" },
  { title: "AP Econ 1.1", note: "Money ideas in motion", src: "/reels/field-note-02.mp4", poster: "/reels/field-note-02-cover.webp", tone: "orange" },
  { title: "AP Econ 1.2", note: "One concept, made practical", src: "/reels/field-note-03.mp4", poster: "/reels/field-note-03-cover.webp", tone: "gold" },
  { title: "AP Econ 1.6", note: "A quick decision lab", src: "/reels/field-note-04.mp4", poster: "/reels/field-note-04-cover.webp", tone: "violet" },
  { title: "FinGoose field note", note: "Learning beyond the worksheet", src: "/reels/field-note-05.mp4", poster: "/reels/field-note-05-cover.webp", tone: "mint" }
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
};

export default function ImpactReels() {
  const railRef = useRef(null);
  const videoRefs = useRef([]);
  const modalVideoRef = useRef(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const titleId = useId();
  const [hovered, setHovered] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.45);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const selected = selectedIndex === null ? null : reels[selectedIndex];

  const pausePreviews = (exceptIndex = null) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== exceptIndex) video.pause();
    });
    if (exceptIndex === null) setHovered(null);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) pausePreviews();
      },
      { threshold: 0.05 }
    );
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") pausePreviews();
    };

    observer.observe(rail);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.muted = muted;
      video.volume = volume;
    });
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = muted;
      modalVideoRef.current.volume = volume;
    }
  }, [muted, volume]);

  useEffect(() => {
    if (selectedIndex === null) return undefined;
    document.body.classList.add("impact-player-open");
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        modalVideoRef.current?.pause();
        setSelectedIndex(null);
        window.requestAnimationFrame(() => openerRef.current?.focus());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("impact-player-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const previewReel = async (index) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRefs.current[index];
    if (!video) return;

    pausePreviews(index);
    video.muted = muted;
    video.volume = volume;

    try {
      await video.play();
      setHovered(index);
    } catch {
      video.muted = true;
      setMuted(true);
      try {
        await video.play();
        setHovered(index);
      } catch {
        setHovered(null);
      }
    }
  };

  const stopPreview = (index) => {
    videoRefs.current[index]?.pause();
    setHovered((current) => (current === index ? null : current));
  };

  const openPlayer = (index, event) => {
    openerRef.current = event.currentTarget;
    pausePreviews();
    setCurrentTime(0);
    setDuration(0);
    setModalPlaying(false);
    setSelectedIndex(index);
  };

  const closePlayer = () => {
    modalVideoRef.current?.pause();
    setSelectedIndex(null);
    setModalPlaying(false);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  const toggleModalPlayback = async () => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (video.paused) {
      if (video.ended) video.currentTime = 0;
      try {
        await video.play();
      } catch {
        setModalPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const seekModal = (event) => {
    const nextTime = Number(event.target.value);
    if (!modalVideoRef.current) return;
    modalVideoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const updateVolume = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    if (muted && volume === 0) setVolume(0.45);
    setMuted((current) => !current);
  };

  const moveRail = (direction) => {
    railRef.current?.scrollBy({
      left: direction * Math.min(620, window.innerWidth * 0.72),
      behavior: "smooth"
    });
  };

  return (
    <div className="impact-reels-module">
      <div className="impact-reels-heading">
        <div>
          <span className="sticker-label sticker-orange">Field notes in motion</span>
          <h2>Watch the lesson keep moving.</h2>
        </div>
        <div className="impact-reels-actions">
          <div className="impact-header-volume" aria-label="Reel preview volume">
            <button
              type="button"
              className="impact-volume-button"
              onClick={toggleMute}
              aria-label={muted ? "Turn reel sound on" : "Mute reel previews"}
              aria-pressed={!muted}
            >
              <Icon name={muted ? "mute" : "volume"} size={18} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={updateVolume}
              aria-label="Reel preview volume"
            />
          </div>
          <a href="https://www.instagram.com/fin.goose/" target="_blank" rel="noreferrer">
            <Icon name="instagram" /> @fin.goose <Icon name="external" size={15} />
          </a>
          <div className="impact-rail-buttons">
            <button type="button" onClick={() => moveRail(-1)} aria-label="Scroll reels left">←</button>
            <button type="button" onClick={() => moveRail(1)} aria-label="Scroll reels right">→</button>
          </div>
        </div>
      </div>

      <div className="impact-reels-rail" ref={railRef}>
        {reels.map((reel, index) => (
          <article className={`impact-reel-card reel-${reel.tone}`} key={reel.src}>
            <button
              className="impact-reel-player"
              type="button"
              onMouseEnter={() => previewReel(index)}
              onMouseLeave={() => stopPreview(index)}
              onClick={(event) => openPlayer(index, event)}
              aria-label={`Open ${reel.title} with video controls`}
            >
              <video
                ref={(node) => { videoRefs.current[index] = node; }}
                src={reel.src}
                poster={reel.poster}
                muted={muted}
                playsInline
                loop
                preload="none"
              />
              <span className="impact-reel-number">0{index + 1}</span>
              <span className={`impact-reel-hover-state ${hovered === index ? "is-previewing" : ""}`}>
                {hovered === index ? "Previewing" : "Hover to preview · Click for controls"}
              </span>
              <span className="impact-reel-copy">
                <strong>{reel.title}</strong>
                <small>{reel.note}</small>
              </span>
            </button>
          </article>
        ))}
      </div>

      <div className="impact-reels-progress" aria-hidden="true">
        <span />
      </div>

      {selected ? (
        <div
          className="impact-player-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePlayer();
          }}
        >
          <section
            className="impact-player-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            tabIndex={-1}
          >
            <button className="impact-player-close" type="button" onClick={closePlayer} aria-label="Close video player">×</button>
            <div className="impact-player-stage">
              <video
                ref={modalVideoRef}
                src={selected.src}
                poster={selected.poster}
                muted={muted}
                playsInline
                preload="metadata"
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onPlay={() => setModalPlaying(true)}
                onPause={() => setModalPlaying(false)}
                onEnded={() => setModalPlaying(false)}
              />
            </div>
            <div className="impact-player-controls">
              <button
                className="impact-player-play"
                type="button"
                onClick={toggleModalPlayback}
                aria-label={modalPlaying ? "Pause video" : "Play video"}
              >
                {modalPlaying ? "Ⅱ" : "▶"}
              </button>
              <div className="impact-player-timeline">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.01"
                  value={Math.min(currentTime, duration || 0)}
                  onChange={seekModal}
                  aria-label="Video position"
                />
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
              <div className="impact-player-volume">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Turn video sound on" : "Mute video"}
                >
                  <Icon name={muted ? "mute" : "volume"} size={19} />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={muted ? 0 : volume}
                  onChange={updateVolume}
                  aria-label="Video volume"
                />
              </div>
            </div>
            <div className="impact-player-caption">
              <span className="sticker-label sticker-orange">Field note 0{selectedIndex + 1}</span>
              <h2 id={titleId}>{selected.title}</h2>
              <p>{selected.note}</p>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
