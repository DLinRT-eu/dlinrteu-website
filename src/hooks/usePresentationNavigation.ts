import { useEffect, useCallback } from 'react';

interface UsePresentationNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToSlide: (index: number) => void;
  onExit: () => void;
  onGoLive?: () => void;
  onToggleFullscreen?: () => void;
}

export function usePresentationNavigation({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onGoToSlide,
  onExit,
  onGoLive,
  onToggleFullscreen,
}: UsePresentationNavigationProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Prevent default for presentation keys
      const presentationKeys = ['ArrowLeft', 'ArrowRight', 'Escape', 'Home', 'End', 'f', 'g'];
      if (presentationKeys.includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          onPrev();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          onNext();
          break;
        case 'Escape':
          onExit();
          break;
        case 'Home':
          onGoToSlide(0);
          break;
        case 'End':
          onGoToSlide(totalSlides - 1);
          break;
        case 'f':
        case 'F':
          onToggleFullscreen?.();
          break;
        case 'g':
        case 'G':
          onGoLive?.();
          break;
        default:
          // Number keys 1-9 to jump to slides
          if (event.key >= '1' && event.key <= '9') {
            const slideIndex = parseInt(event.key) - 1;
            if (slideIndex < totalSlides) {
              onGoToSlide(slideIndex);
            }
          }
          break;
      }
    },
    [currentSlide, totalSlides, onNext, onPrev, onGoToSlide, onExit, onGoLive, onToggleFullscreen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    goToNext: onNext,
    goToPrev: onPrev,
    goToSlide: onGoToSlide,
    exit: onExit,
    goLive: onGoLive,
  };
}
