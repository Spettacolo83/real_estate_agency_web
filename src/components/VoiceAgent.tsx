"use client";

import Script from "next/script";
import { useLocale } from "next-intl";

const AGENT_IDS: Record<string, string> = {
  it: "agent_3901kv97944qfw78ab1bn77xbnv0",
  es: "agent_0201kv97ar74er49w49cnxwwt77s",
  en: "agent_2401kv97cenxf6zsk8qw4adj5b7z",
};

export default function VoiceAgent() {
  const locale = useLocale();
  const agentId = AGENT_IDS[locale] ?? AGENT_IDS.en;
  if (!agentId) return null;

  return (
    <>
      <elevenlabs-convai agent-id={agentId} key={agentId} />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
