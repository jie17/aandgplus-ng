import DPlayer from "dplayer";
import { useEffect } from "react";

export default function Player() {
  useEffect(() => {
    const dp = new DPlayer({
      container: document.getElementById("dplayer"),
      live: "true",
      autoplay: true,
      video: {
        url: "/api/radio/3G.m3u8",
        type: "hls",
      },
    });
  }, []);

  return <div id="dplayer" />;
}
