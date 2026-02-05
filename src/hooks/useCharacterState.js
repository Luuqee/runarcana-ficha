// src/hooks/useCharacterState.js
import { useState, useEffect, useRef } from "react";
import { loadSheet, saveSheet } from "../utils/sheetStorage";
import { STORAGE_KEY, defaultState } from "../data/sheetConstants";

export function useCharacterState({ initialState, onUpdate, personagemId }) {
  const [state, setState] = useState(() => {
    if (initialState) return initialState;
    return loadSheet(STORAGE_KEY, defaultState);
  });
  
  const [loaded, setLoaded] = useState(false);
  const saveTimeoutRef = useRef(null);

  useEffect(() => setLoaded(true), []);
  
  // Sincroniza initialState quando personagemId mudar
  useEffect(() => {
    if (initialState && personagemId) {
      setState(initialState);
    }
  }, [personagemId]);
  
  // Salva mudanças com debounce
  useEffect(() => {
    if (!loaded) return;
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    if (onUpdate && personagemId) {
      saveTimeoutRef.current = setTimeout(() => {
        onUpdate(state);
      }, 1000);
    } else {
      saveSheet(STORAGE_KEY, state);
    }
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state, loaded]);

  const update = (patch) => setState((s) => ({ ...s, ...patch }));

  return { state, update, loaded };
}