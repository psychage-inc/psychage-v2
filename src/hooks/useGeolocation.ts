import { useState, useCallback, useRef, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
}

interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
  clearLocation: () => void;
}

/**
 * Browser geolocation API wrapper with "Use my location" functionality.
 */
export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    isLoading: false,
    error: null,
    isSupported: typeof navigator !== 'undefined' && 'geolocation' in navigator,
  });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const requestLocation = useCallback(() => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported by your browser' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!mountedRef.current) return;
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isLoading: false,
          error: null,
          isSupported: true,
        });
      },
      (err) => {
        if (!mountedRef.current) return;
        let errorMessage = 'Failed to get your location';
        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = 'Location access was denied. Please enable it in your browser settings.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information is unavailable';
        } else if (err.code === err.TIMEOUT) {
          errorMessage = 'Location request timed out';
        }
        setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  }, [state.isSupported]);

  const clearLocation = useCallback(() => {
    setState(prev => ({
      ...prev,
      latitude: null,
      longitude: null,
      error: null,
    }));
  }, []);

  return {
    ...state,
    requestLocation,
    clearLocation,
  };
}
