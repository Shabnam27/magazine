import React from 'react';
import { Newspaper, Mail, Facebook, Instagram, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--card)',
      padding: '4rem 0 2rem',
      marginTop: '4rem',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--primary)',
              marginBottom: '1rem'
            }}>
              <Newspaper size={32} />
              <span>Стенгазета</span>
            </div>
            <p style={{ opacity: 0.7 }}>
              Официальная электронная стенгазета нашей школы. Все новости, мероприятия и достижения в одном месте.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Категории</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.8 }}>
              <li><a href="#">Все новости</a></li>
              <li><a href="#">Спорт</a></li>
              <li><a href="#">Наука</a></li>
              <li><a href="#">Мероприятия</a></li>
              <li><a href="#">Достижения</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Контакты</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.8 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} />
                <span>school@example.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <Facebook size={24} />
                <Instagram size={24} />
                <Send size={24} />
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '2rem',
          textAlign: 'center',
          opacity: 0.6,
          fontSize: '0.9rem'
        }}>
          © {new Date().getFullYear()} Школьная Стенгазета. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
