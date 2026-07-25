import { useState } from 'react';
import { cn } from '@/lib/utils';

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function SmartImage({ className, onLoad, style, ...props }: SmartImageProps) {
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
      style={{
        ...style,
        backgroundColor: loaded ? undefined : '#161618',
        backgroundImage: loaded
          ? undefined
          : 'linear-gradient(110deg, #161618 30%, #1f1f22 50%, #161618 70%)',
        backgroundSize: '200% 100%',
        animation: loaded ? undefined : 'smartimg-shimmer 1.4s ease-in-out infinite',
      }}
      className={cn('transition-opacity duration-500 ease-out', className)}
    />
  );
}