"use client";

import Script from "next/script";
import { useLocale } from "next-intl";

const AGENT_IDS: Record<string, string> = {
  it: "agent_3901kv97944qfw78ab1bn77xbnv0",
  es: "agent_0201kv97ar74er49w49cnxwwt77s",
  en: "agent_2401kv97cenxf6zsk8qw4adj5b7z",
};

const TIMEZONE_BY_LOCALE: Record<string, string> = {
  it: "Europe/Rome",
  es: "Europe/Madrid",
  en: "Europe/London",
};

export default function VoiceAgent() {
  const locale = useLocale();
  const agentId = AGENT_IDS[locale] ?? AGENT_IDS.en;
  const tz = TIMEZONE_BY_LOCALE[locale] ?? TIMEZONE_BY_LOCALE.en;
  if (!agentId) return null;

  const dynamicVars = JSON.stringify({
    agent_lang: locale,
    agent_tz: tz,
  });

  return (
    <>
      <elevenlabs-convai
        agent-id={agentId}
        dynamic-variables={dynamicVars}
        key={agentId}
      />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
