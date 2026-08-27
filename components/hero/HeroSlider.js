"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "The Solstice collection",
    title: <>Jewelry,<br /><em>made to linger.</em></>,
    copy: "Quiet pieces for everyday moments.",
    href: "/shop",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=2000&q=90",
    alt: "Gold jewelry arranged on cream fabric"
  },
  {
    eyebrow: "Objects of affection",
    title: <>Light, held<br /><em>close.</em></>,
    copy: "Sculptural forms with a softly luminous finish.",
    href: "/collections/necklaces",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=2000&q=90",
    alt: "Fine gold necklace"
  }
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused]);

  function move(direction) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      tabIndex="0"
    >
      {slides.map((slide, index) => (
        <div className={`heroSlide ${active === index ? "active" : ""}`} aria-hidden={active !== index} key={slide.copy}>
          <div className="heroWash" />
          <div className="heroContent">
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p>{slide.copy}</p>
            <Link className="textLink" href={slide.href}>Explore collection <span>↗</span></Link>
          </div>
          <div className="heroImage">
            <Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" />
          </div>
          <div className="floatingNote">
            <span>01</span>
            <p>Designed in small editions<br />Made with intention</p>
          </div>
        </div>
      ))}
      <div className="heroControls">
        <button onClick={() => move(-1)} aria-label="Previous slide">←</button>
        <div className="heroPagination">
          {slides.map((slide, index) => (
            <button className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} key={slide.copy}>
              <i />
            </button>
          ))}
        </div>
        <button onClick={() => move(1)} aria-label="Next slide">→</button>
      </div>
    </section>
  );
}
