import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Company profile film: vertical 9:16 cut for phones, 16:9 cut for tablets and desktops.
export const PROFILE_VIDEO = {
  desktop: { src: '/videos/mboma-profil-16x9.mp4', poster: '/videos/poster-16x9.jpg' },
  mobile: { src: '/videos/mboma-profil-9x16.mp4', poster: '/videos/poster-9x16.jpg' },
};

const MOBILE_QUERY = '(max-width: 767px)';

export const useIsMobileViewport = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
};

// Visitors who asked for less motion or less data get the poster instead of an autoplaying loop.
const prefersStillBanner = () => {
  if (typeof window === 'undefined') return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return reduced || saveData;
};

const useProfileSource = () => {
  const isMobile = useIsMobileViewport();
  return { isMobile, ...(isMobile ? PROFILE_VIDEO.mobile : PROFILE_VIDEO.desktop) };
};

/** Muted looping film used as the homepage banner background. */
export const BannerVideo: React.FC<{ videoRef?: React.Ref<HTMLVideoElement>; onEnded?: () => void }> = ({ videoRef, onEnded }) => {
  const { src, poster } = useProfileSource();
  const [still] = useState(prefersStillBanner);

  if (still) {
    return <img src={poster} alt="Film institutionnel MboMa & Co." className="absolute inset-0 w-full h-full object-cover" />;
  }
  return (
    <video
      key={src}
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Film institutionnel MboMa & Co."
      onEnded={(e) => { const v = e.currentTarget; v.muted = true; v.loop = true; v.play().catch(() => {}); onEnded?.(); }}
    />
  );
};

/** Inline player with sound and controls; frame ratio follows the selected cut. */
export const ProfileVideoPlayer: React.FC<{ className?: string; autoPlay?: boolean }> = ({ className = '', autoPlay = false }) => {
  const { src, poster, isMobile } = useProfileSource();
  return (
    <div
      className={`relative mx-auto overflow-hidden bg-black shadow-2xl ${isMobile ? 'aspect-[9/16]' : 'aspect-video'} ${className}`}
      style={{ width: isMobile ? 'min(100%, 24rem, calc(82vh * 9 / 16))' : 'min(100%, calc(82vh * 16 / 9))' }}
    >
      <video
        key={src}
        className="absolute inset-0 w-full h-full"
        src={src}
        poster={poster}
        controls
        playsInline
        autoPlay={autoPlay}
        preload={autoPlay ? 'auto' : 'metadata'}
      >
        Votre navigateur ne peut pas lire cette vidéo.
      </video>
    </div>
  );
};

/** Full-screen lightbox playing the film from the start, with sound. */
export const ProfileVideoModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { isMobile } = useProfileSource();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Film institutionnel MboMa & Co."
        >
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white p-2"
            aria-label="Fermer la vidéo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <motion.div
            className={isMobile ? 'w-full max-w-sm' : 'w-full max-w-6xl flex justify-center'}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileVideoPlayer autoPlay />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
