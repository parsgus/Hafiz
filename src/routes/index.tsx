import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import foto from "@/assets/foto-profil.jpg.asset.json";
import musik from "@/assets/musik.m4a.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Member ΣΛ" },
      { name: "description", content: "Seorang editor mobile yang bikin compositing manga edit." },
      { property: "og:title", content: "Member ΣΛ" },
      { property: "og:description", content: "Seorang editor mobile yang bikin compositing manga edit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => audioRef.current?.pause(), []);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musik.url);
      audioRef.current.loop = true;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-5 py-4 lg:px-10">
        <span className="text-2xl font-black tracking-tight lg:text-3xl">ΣΛ</span>
        <span className="text-sm font-semibold text-muted-foreground lg:text-base">Member</span>
      </header>
      <main className="mx-auto flex max-w-[1800px] flex-col gap-6 px-5 py-6 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-10 lg:py-8">
        <section className="rounded-3xl bg-primary px-5 py-16 text-primary-foreground lg:order-2 lg:px-10 lg:py-12">
          <p className="text-sm font-bold uppercase tracking-widest">Member ΣΛ</p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl lg:text-4xl">
            Seorang editor mobile yang kerjaannya tiap hari bikin compositing manga edit sampai mirip Setelah Efek ( wenyah ae )
          </h1>
          <button
            onClick={toggle}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 font-bold text-foreground hover:opacity-90"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {playing ? "Jeda" : "Putar"}
          </button>
        </section>
        <section className="rounded-3xl bg-primary p-4 lg:order-1">
          <img src={foto.url} alt="Foto profil" className="mx-auto h-auto w-full rounded-2xl lg:h-[38vh] lg:w-auto" />
          <p className="mt-3 text-center font-bold text-primary-foreground">Foto</p>
        </section>
      </main>
    </div>
  );
}
