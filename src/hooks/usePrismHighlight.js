// src/hooks/usePrismHighlight.js
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Choose a theme, you can change it to another theme

const usePrismHighlight = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
};

export default usePrismHighlight;
