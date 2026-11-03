'use client';

import type { Map as MlMap, Marker as MlMarker, Popup as MlPopup } from 'maplibre-gl';
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

export interface MapMarker {
  id: string;
  /** [lat, lng] */
  latLng: [number, number];
  color: string;
  label: string;
}

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

interface LazyMapProps {
  markers: MapMarker[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  renderPopup: (id: string) => ReactNode;
  ariaLabel: string;
  loadingText: string;
  errorText: string;
  className?: string;
  /** Zoom used when there is a single marker. */
  singleZoom?: number;
}

/**
 * MapLibre GL map that loads only when scrolled near the viewport.
 * Markers are real <button>s (Tab-focusable, Enter opens the popup, Escape closes it).
 */
export function LazyMap({
  markers,
  selectedId,
  onSelect,
  renderPopup,
  ariaLabel,
  loadingText,
  errorText,
  className,
  singleZoom = 13,
}: LazyMapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const libRef = useRef<typeof import('maplibre-gl') | null>(null);
  const markersRef = useRef(new Map<string, { marker: MlMarker; el: HTMLButtonElement }>());
  const popupRef = useRef<MlPopup | null>(null);
  const onSelectRef = useRef(onSelect);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [popupNode] = useState<HTMLDivElement | null>(() =>
    typeof document === 'undefined' ? null : document.createElement('div'),
  );

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // 1. Load MapLibre when the map comes near the viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let cancelled = false;
    // Load only when the map is in view AND the visitor has interacted (scroll, touch, key, pointer),
    // so the ~250 KB MapLibre bundle never competes with first paint.
    let visible = false;
    let interacted = false;
    let started = false;
    const EVENTS = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'] as const;
    const onInteract = () => {
      interacted = true;
      EVENTS.forEach((ev) => window.removeEventListener(ev, onInteract));
      maybeStart();
    };
    EVENTS.forEach((ev) => window.addEventListener(ev, onInteract, { passive: true, once: true }));
    const maybeStart = () => {
      if (started || !visible || !interacted) return;
      started = true;
      start();
    };
    const start = () => {
        setStatus('loading');
        Promise.all([import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl.css')])
          .then(([lib]) => {
            if (cancelled || !containerRef.current) return;
            const ml = (lib as unknown as { default?: typeof import('maplibre-gl') }).default ?? lib;
            libRef.current = ml;
            ml.setWorkerUrl('/vendor/maplibre-gl-worker.mjs');
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const map = new ml.Map({
              container: containerRef.current,
              style: STYLE_URL,
              center: [45.5, 14.5],
              zoom: 5.4,
              attributionControl: { compact: true },
              cooperativeGestures: true,
              dragRotate: false,
              pitchWithRotate: false,
              fadeDuration: reduce ? 0 : 300,
            });
            map.touchZoomRotate.disableRotation();
            map.keyboard.disableRotation();
            map.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right');
            map.once('load', () => !cancelled && setStatus('ready'));
            mapRef.current = map;
          })
          .catch(() => !cancelled && setStatus('error'));
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        visible = true;
        maybeStart();
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(wrap);
    return () => {
      cancelled = true;
      io.disconnect();
      EVENTS.forEach((ev) => window.removeEventListener(ev, onInteract));
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // 2. Sync markers and fit bounds.
  useEffect(() => {
    const map = mapRef.current;
    const ml = libRef.current;
    if (status !== 'ready' || !map || !ml) return;
    const store = markersRef.current;
    store.forEach(({ marker }) => marker.remove());
    store.clear();
    markers.forEach((m) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'map-marker';
      el.setAttribute('aria-label', m.label);
      el.setAttribute('aria-pressed', 'false');
      const dot = document.createElement('span');
      dot.style.background = m.color;
      el.appendChild(dot);
      el.addEventListener('click', (ev) => {
        ev.stopPropagation();
        onSelectRef.current(m.id);
      });
      const marker = new ml.Marker({ element: el }).setLngLat([m.latLng[1], m.latLng[0]]).addTo(map);
      store.set(m.id, { marker, el });
    });
    if (markers.length === 1) {
      map.jumpTo({ center: [markers[0].latLng[1], markers[0].latLng[0]], zoom: singleZoom });
    } else if (markers.length > 1) {
      const b = new ml.LngLatBounds();
      markers.forEach((m) => b.extend([m.latLng[1], m.latLng[0]]));
      map.fitBounds(b, { padding: 64, maxZoom: 9, duration: 0 });
    }
  }, [markers, status, singleZoom]);

  // 3. Popup for the selected marker.
  useEffect(() => {
    const map = mapRef.current;
    const ml = libRef.current;
    popupRef.current?.remove();
    popupRef.current = null;
    markersRef.current.forEach(({ el }, id) => el.setAttribute('aria-pressed', String(id === selectedId)));
    if (status !== 'ready' || !map || !ml || !selectedId || !popupNode) return;
    const m = markers.find((x) => x.id === selectedId);
    if (!m) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const popup = new ml.Popup({ offset: 20, anchor: 'bottom', maxWidth: '300px', closeButton: true, focusAfterOpen: true })
      .setLngLat([m.latLng[1], m.latLng[0]])
      .setDOMContent(popupNode)
      .addTo(map);
    popup.on('close', () => {
      if (popupRef.current === popup) {
        popupRef.current = null;
        onSelectRef.current(null);
      }
    });
    popupRef.current = popup;
    map.easeTo({ center: [m.latLng[1], m.latLng[0]], duration: reduce ? 0 : 250, offset: [0, Math.round(map.getContainer().clientHeight * 0.32)] });
  }, [selectedId, status, markers, popupNode]);

  // Escape closes the popup and returns focus to its marker.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedId) {
      const el = markersRef.current.get(selectedId)?.el;
      onSelect(null);
      el?.focus();
    }
  };

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden bg-concrete', className)} onKeyDown={onKeyDown}>
      <div ref={containerRef} role="region" aria-label={ariaLabel} className="h-full w-full" />
      {status !== 'ready' ? (
        <div className="tri-pattern absolute inset-0 grid place-items-center p-6 text-center" aria-live="polite">
          <p className="max-w-xs text-steel">{status === 'error' ? errorText : loadingText}</p>
        </div>
      ) : null}
      {status === 'ready' && selectedId && popupNode ? createPortal(renderPopup(selectedId), popupNode) : null}
    </div>
  );
}
