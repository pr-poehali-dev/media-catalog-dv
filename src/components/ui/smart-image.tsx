import { useState } from 'react';
import { cn } from '@/lib/utils';

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function SmartImage({ className, onLoad, ...props }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      {...props}
      loading="eager"
      decoding="async"
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn(
        'transition-opacity duration-500 ease-out',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  );
}
