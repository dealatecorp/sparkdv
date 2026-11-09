import './tailwind.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);

import './redesign.css';

import './components/ui/product-shelf.css';

import './components/ui/motion-footer.css';
import './components/ui/catalog-shelf.css';
import './components/editorial/editorial.css';
import './components/ui/spark-product-showcase.css';
import './components/ui/checkout-contact.css';
import './components/ui/dock.css';
import './components/ui/liquid-morph-floating-menu.css';
import './commerce.css';
