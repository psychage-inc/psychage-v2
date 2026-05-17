import React from 'react';
import type { ImageBundle } from '@/components/home/v2/homeImages';

type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'>;

interface PictureProps extends ImgProps {
  image: ImageBundle;
  alt: string;
  pictureClassName?: string;
}

const Picture: React.FC<PictureProps> = ({
  image,
  alt,
  loading = 'lazy',
  decoding = 'async',
  pictureClassName,
  className,
  ...imgProps
}) => (
  <picture className={pictureClassName}>
    <source srcSet={image.avif} type="image/avif" />
    <source srcSet={image.webp} type="image/webp" />
    <img
      src={image.jpeg}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
      {...imgProps}
    />
  </picture>
);

export default Picture;
