import { useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import { StackedCards } from "./components/ui/glass-cards";

export default function App() {
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/site-content.html")
      .then((response) => response.text())
      .then((html) => {
        if (cancelled) return;
        setMarkup(html.replace(/<script[^>]*script\.js[^>]*><\/script>/gi, ""));
      })
      .catch(() => {
        if (cancelled) return;
        setMarkup("");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!markup) return;

    const existing = document.getElementById("legacy-runtime-script");
    if (existing) return;

    const script = document.createElement("script");
    script.id = "legacy-runtime-script";
    script.src = "/script.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [markup]);

  useEffect(() => {
    if (!markup) return;

    const host = document.querySelector("#portfolio-section .post-shell");
    if (!(host instanceof HTMLElement)) return;

    host.innerHTML = "";
    const mount = document.createElement("div");
    mount.id = "portfolio-react-mount";
    host.appendChild(mount);

    const root: Root = createRoot(mount);
    root.render(<StackedCards />);

    return () => {
      root.unmount();
    };
  }, [markup]);

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
