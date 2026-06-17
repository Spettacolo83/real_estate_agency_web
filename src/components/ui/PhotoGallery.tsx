"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type Props = {
  photos: ReadonlyArray<string>;
  alt: string;
  variant: "hero" | "grid";
  startOffset?: number;
};

export function PhotoGallery({ photos, alt, variant, startOffset = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const allSlides = photos.map((src) => ({ src, alt }));

  const visible =
    variant === "hero" ? photos.slice(0, 5) : photos.slice(startOffset);

  return (
    <>
      {variant === "hero" ? (
        <HeroLayout
          photos={visible}
          alt={alt}
          onPick={(i) => setOpenIndex(i)}
        />
      ) : (
        <GridLayout
          photos={visible}
          alt={alt}
          onPick={(i) => setOpenIndex(i + startOffset)}
        />
      )}

      <Lightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        close={() => setOpenIndex(null)}
        slides={allSlides}
        plugins={[Thumbnails, Zoom]}
        carousel={{ finite: false }}
        animation={{ swipe: 300, fade: 250 }}
        styles={{
          container: { backgroundColor: "rgba(26, 26, 26, 0.96)" },
        }}
        thumbnails={{
          position: "bottom",
          width: 100,
          height: 64,
          gap: 8,
          padding: 4,
          border: 0,
          borderRadius: 2,
        }}
      />
    </>
  );
}

function HeroLayout({
  photos,
  alt,
  onPick,
}: {
  photos: ReadonlyArray<string>;
  alt: string;
  onPick: (index: number) => void;
}) {
  const hero = photos[0];
  const grid = photos.slice(1, 5);

  return (
    <div className="grid gap-3 md:grid-cols-12 md:gap-4">
      <button
        type="button"
        onClick={() => onPick(0)}
        className="group relative aspect-[4/3] overflow-hidden bg-[color:var(--color-hairline)] md:col-span-8 md:aspect-[16/10]"
        aria-label={`Open photo 1 of ${photos.length}`}
      >
        {hero ? (
          <Image
            src={hero}
            alt={alt}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            priority
            unoptimized
          />
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-[2px] bg-[color:var(--color-deep)]/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-[color:var(--color-canvas)] backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
          ⤢ View all
        </span>
      </button>
      <div className="grid grid-cols-2 gap-3 md:col-span-4 md:gap-4">
        {grid.map((url, i) => (
          <button
            key={url}
            type="button"
            onClick={() => onPick(i + 1)}
            className="group relative aspect-square overflow-hidden bg-[color:var(--color-hairline)]"
            aria-label={`Open photo ${i + 2} of ${photos.length}`}
          >
            <Image
              src={url}
              alt={`${alt} — ${i + 2}`}
              fill
              sizes="(min-width: 768px) 16vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function GridLayout({
  photos,
  alt,
  onPick,
}: {
  photos: ReadonlyArray<string>;
  alt: string;
  onPick: (index: number) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((url, i) => (
        <button
          key={url}
          type="button"
          onClick={() => onPick(i)}
          className="group relative aspect-[4/3] overflow-hidden bg-[color:var(--color-hairline)]"
          aria-label={`Open photo ${i + 1}`}
        >
          <Image
            src={url}
            alt={`${alt} — ${i + 1}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            unoptimized
          />
        </button>
      ))}
    </div>
  );
}
