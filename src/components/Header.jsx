import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header
      className="header glass transition-all"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 0'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* ЛОГО + НАЗВАНИЕ */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--primary)',
            textDecoration: 'none'
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '45px',
              objectFit: 'contain'
            }}
          />
          <span>Стенгазета</span>
        </Link>

        {/* НАВИГАЦИЯ */}
        <nav
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            fontWeight: 500
          }}
        >
          <Link to="/" className="transition-all hover:text-primary">
            Главная
          </Link>

          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ opacity: 0.6 }} />
          </div>

          <Link
            to="/admin"
            className="glass transition-all"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius)',
              backgroundColor: 'var(--primary)',
              color: 'white',
              textDecoration: 'none'
            }}
          >
            <User size={18} />
            <span>Админка</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;