import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = ['Спорт', 'Наука', 'Мероприятия', 'Достижения'];
const CLASSES = ['1-4', '5-8', '9-12'];
const MOKKY_API_URL = 'https://441a5275e1ace0b6.mokky.dev/data';

const AdminDashboard = () => {
  const [news, setNews] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // ID of the item being edited
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Спорт',
    classRange: '1-4',
    image: ''
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(MOKKY_API_URL);
        if (!response.ok) {
          throw new Error('Server response was not ok');
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        alert('Ошибка при загрузке новостей с сервера Mokky');
      }
    };
    fetchNews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await fetch(`${MOKKY_API_URL}/${isEditing}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to update');
        const updatedItem = await response.json();
        setNews(news.map(item => item.id === isEditing ? updatedItem : item));
        setIsEditing(null);
      } else {
        const newItem = {
          ...formData,
          date: new Date().toLocaleDateString('ru-RU')
        };
        const response = await fetch(MOKKY_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });
        if (!response.ok) throw new Error('Failed to create');
        const savedItem = await response.json();
        setNews([savedItem, ...news]);
      }
      setFormData({ title: '', content: '', category: 'Спорт', classRange: '1-4', image: '' });
    } catch (error) {
      console.error('Save error:', error);
      alert('Ошибка при сохранении данных');
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      try {
        const response = await fetch(`${MOKKY_API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete');
        setNews(news.filter(item => item.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  const startEdit = (item) => {
    setIsEditing(item.id);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      classRange: item.classRange,
      image: item.image
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '5rem' }}>
      <Header />
      
      <main className="container">
        <section style={{ margin: '3rem 0' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            {isEditing ? 'Редактировать новость' : 'Добавить новость'}
          </h2>

          <form onSubmit={handleSubmit} className="glass" style={{
            padding: '2rem',
            borderRadius: 'var(--radius)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Заголовок</label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="transition-all"
                style={{
                  padding: '0.8rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>URL Изображения</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleInputChange}
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)'
                  }}
                />
                <button type="button" className="glass" style={{ padding: '0.5rem' }}>
                  <ImageIcon size={20} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Категория</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  padding: '0.8rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)'
                }}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Класс</label>
              <select
                name="classRange"
                value={formData.classRange}
                onChange={handleInputChange}
                style={{
                  padding: '0.8rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)'
                }}
              >
                {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
              <label>Содержание</label>
              <textarea
                required
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
                style={{
                  padding: '0.8rem',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', gridColumn: '1 / -1' }}>
              <button type="submit" style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '0.8rem 2rem',
                borderRadius: 'var(--radius)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {isEditing ? <Save size={20} /> : <Plus size={20} />}
                {isEditing ? 'Сохранить изменения' : 'Опубликовать'}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(null)}
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'white',
                    padding: '0.8rem 2rem',
                    borderRadius: 'var(--radius)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <X size={20} /> Отмена
                </button>
              )}
            </div>
          </form>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Управление новостями</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {news.map(item => (
              <div key={item.id} className="glass" style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} alt="" />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.category} • {item.classRange} класс • {item.date}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => startEdit(item)}
                    style={{ padding: '0.5rem', color: 'var(--primary)' }}
                    title="Редактировать"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{ padding: '0.5rem', color: '#ef4444' }}
                    title="Удалить"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {news.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                Пока нет новостей. Создайте свою первую новость!
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
