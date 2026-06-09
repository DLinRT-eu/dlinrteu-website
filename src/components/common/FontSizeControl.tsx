import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFontSize } from '@/hooks/useFontSize';

interface FontSizeControlProps {
  className?: string;
}

export default function FontSizeControl({ className }: FontSizeControlProps) {
  const { level, increase, decrease, reset, canIncrease, canDecrease } = useFontSize();

  const btn =
    'h-8 w-8 p-0 text-white hover:bg-white/15 hover:text-white disabled:opacity-40';

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={`flex items-center rounded-md bg-white/10 ${className ?? ''}`}
        role="group"
        aria-label="Text size"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={btn}
              onClick={decrease}
              disabled={!canDecrease}
              aria-label="Decrease text size"
            >
              <span className="text-xs font-semibold">A-</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Decrease text size</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={btn}
              onClick={reset}
              disabled={level === 'normal'}
              aria-label="Reset text size"
            >
              <span className="text-sm font-semibold">A</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset text size</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={btn}
              onClick={increase}
              disabled={!canIncrease}
              aria-label="Increase text size"
            >
              <span className="text-base font-semibold">A+</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Increase text size</TooltipContent>
        </Tooltip>

        <span className="sr-only" aria-live="polite">
          Text size: {level}
        </span>
      </div>
    </TooltipProvider>
  );
}
