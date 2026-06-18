import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ElevenLabsConvaiAttrs = HTMLAttributes<HTMLElement> & {
  "agent-id": string;
  "dynamic-variables"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<ElevenLabsConvaiAttrs, HTMLElement>;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<ElevenLabsConvaiAttrs, HTMLElement>;
    }
  }
}

export {};
