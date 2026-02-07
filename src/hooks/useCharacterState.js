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
  const onUpdateRef = useRef(onUpdate);
  const personagemIdRef = useRef(personagemId);

  // Manter refs atualizadas dentro de useEffect (React 19 exige isso)
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    personagemIdRef.current = personagemId;
  }, [personagemId]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setLoaded(true), []);

  // Sincroniza initialState quando personagemId mudar
  useEffect(() => {
    if (initialState && personagemId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(initialState);
    }
  }, [personagemId, initialState]);

  // Salva mudanças com debounce
  useEffect(() => {
    if (!loaded) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (onUpdateRef.current && personagemIdRef.current) {
      saveTimeoutRef.current = setTimeout(() => {
        onUpdateRef.current(state);
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