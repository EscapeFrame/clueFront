import { atom } from 'recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Customapi from '@/shared/config/api';

export const profileImageState = atom<string | null>({
  key: 'profileImageState',
  default: null,
});

// Module-level cache to ensure only one network request for the profile image
let cachedUrl: string | null = null;
let fetchPromise: Promise<string | null> | null = null;

export const fetchProfileImageOnce = async (): Promise<string | null> => {
  if (cachedUrl) return cachedUrl;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const response = await Customapi.get('/api/user/me/image', { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      cachedUrl = url;
      return url;
    } catch (err) {
      console.error('fetchProfileImageOnce error', err);
      return null;
    } finally {
      // Clear the promise reference so future refreshes will create a new one
      fetchPromise = null;
    }
  })();

  return fetchPromise;
};

export const refreshProfileImage = async (): Promise<string | null> => {
  // Revoke previous object URL to avoid memory leaks
  if (cachedUrl) {
    try {
      URL.revokeObjectURL(cachedUrl);
    } catch {
        // ignore
      }
    cachedUrl = null;
  }
  return fetchProfileImageOnce();
};

// Hook for components to consume the shared/cached profile image
export const useProfileImage = () => {
  const [image, setImage] = useRecoilState(profileImageState);

  useEffect(() => {
    let mounted = true;

    if (!image) {
      fetchProfileImageOnce().then((url) => {
        if (!mounted) return;
        if (url) setImage(url);
      });
    }

    return () => {
      mounted = false;
    };
  }, [image, setImage]);

  return [image, setImage, refreshProfileImage] as const;
};
