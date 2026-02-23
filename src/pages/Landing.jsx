import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AutoSlider from '../components/AutoSlider';
import { Filter, Grid, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['Все', 'Спорт', 'Наука', 'Мероприятия', 'Достижения'];
const CLASSES = ['Все', '1-4', '5-8', '9-12'];

const Landing = () => {
  const [news, setNews] = useState([]);
  const [filterCategory, setFilterCategory] = useState('Все');
  const [filterClass, setFilterClass] = useState('Все');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://441a5275e1ace0b6.mokky.dev/data');
        if (!response.ok) {
          throw new Error('Server response was not ok');
        }
        const data = await response.json();
        
        if (data && data.length > 0) {
          setNews(data);
        } else {
          // Fallback to demo data if empty
          setNews(getDemoData());
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        // If server is not running, show demo data
        setNews(getDemoData());
      }
    };

    const getDemoData = () => {
      return Array.from({ length: 20 }).map((_, i) => ({
        id: i + 1,
        title: `Новость №${i + 1}`,
        content: "Краткое описание события, которое произошло в нашей школе. Будьте в курсе всех новостей!",
        category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1],
        classRange: CLASSES[Math.floor(Math.random() * (CLASSES.length - 1)) + 1],
        date: new Date().toLocaleDateString('ru-RU'),
        image: `https://picsum.photos/seed/${i + 10}/800/600`
      }));
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const categoryMatch = filterCategory === 'Все' || item.category === filterCategory;
    const classMatch = filterClass === 'Все' || item.classRange === filterClass;
    return categoryMatch && classMatch;
  });

  const newsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const currentNews = filteredNews.slice(currentPage * newsPerPage, (currentPage + 1) * newsPerPage);

  return (
    <div style={{ paddingTop: '5rem' }}>
      <Header />
      
      <main className="container">
        <AutoSlider />

        {/* Filter Section */}
        <section style={{ margin: '3rem 0' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '2rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Filter size={20} />
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setFilterCategory(cat); setCurrentPage(0); }}
                    className="transition-all"
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius)',
                      backgroundColor: filterCategory === cat ? 'var(--primary)' : 'var(--card)',
                      color: filterCategory === cat ? 'white' : 'inherit',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <LayoutGrid size={20} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {CLASSES.map(cls => (
                  <button
                    key={cls}
                    onClick={() => { setFilterClass(cls); setCurrentPage(0); }}
                    className="transition-all"
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius)',
                      backgroundColor: filterClass === cls ? 'var(--primary)' : 'var(--card)',
                      color: filterClass === cls ? 'white' : 'inherit',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Последние новости
          </h2>

          <div className="news-grid">
            <AnimatePresence mode='wait'>
              {currentNews.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass transition-all"
                  style={{
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
                      <span>{item.category}</span>
                      <span>{item.classRange} класс</span>
                    </div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{item.title}</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{item.content}</p>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.date}</span>
                      <button style={{ color: 'var(--primary)', fontWeight: 600 }}>Подробнее</button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius)',
                    backgroundColor: currentPage === i ? 'var(--primary)' : 'var(--card)',
                    color: currentPage === i ? 'white' : 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
