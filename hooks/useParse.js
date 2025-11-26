// hooks/useParse.js
import { useEffect, useState } from 'react';

export function useParse() {
  const [parse, setParse] = useState(null);

  useEffect(() => {
    // Só carrega o Parse no lado do cliente
    const loadParse = async () => {
      const Parse = (await import('parse')).default;
      
      Parse.initialize(
        process.env.NEXT_PUBLIC_PARSE_APP_ID, 
        process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY
      );
      Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL;
      
      setParse(Parse);
    };

    loadParse();
  }, []);

  return parse;
}