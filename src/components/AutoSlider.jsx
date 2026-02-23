import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Наука и будущее",
    description: "Наши ученики заняли первое место на городском научном конкурсе молодых инженеров.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: 2,
    title: "Весенний бал",
    description: "Подготовка к самому яркому мероприятию этой весны идет полным ходом.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  },
  {
    id: 3,
    title: "Спортивные победы",
    description: "Футбольная команда нашей школы вышла в финал регионального чемпионата.",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1200",
    link: "#"
  }
];

const AutoSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="slider-container" style={{
      position: 'relative',
      height: '500px',
      overflow: 'hidden',
      borderRadius: 'var(--radius)',
      margin: '2rem 0',
      backgroundColor: '#000'
    }}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="slide transition-all"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 1 : 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            transition: 'opacity 1s ease-in-out'
          }}
        >
          {/* Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
          }} />

          {/* Content */}
          <div className="container" style={{
            position: 'relative',
            zIndex: 2,
            padding: '3rem 2rem',
            color: 'white'
          }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{slide.title}</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', opacity: 0.9 }}>{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prev} className="glass" style={{
        position: 'absolute',
        top: '50%',
        left: '1rem',
        transform: 'translateY(-50%)',
        zIndex: 10,
        padding: '1rem',
        borderRadius: '50%',
        color: 'white'
      }}>
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="glass" style={{
        position: 'absolute',
        top: '50%',
        right: '1rem',
        transform: 'translateY(-50%)',
        zIndex: 10,
        padding: '1rem',
        borderRadius: '50%',
        color: 'white'
      }}>
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        gap: '0.5rem'
      }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '2rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: '1rem',
              backgroundColor: 'white',
              opacity: i === current ? 1 : 0.5,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;
