import AsyncStorage from '@react-native-async-storage/async-storage';

const memoryStore = {};

const safeStorage = {
  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) return value;
      return memoryStore[key] || null;
    } catch (e) {
      return memoryStore[key] || null;
    }
  },
  async setItem(key, value) {
    try {
      memoryStore[key] = value;
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      memoryStore[key] = value;
    }
  },
  async removeItem(key) {
    try {
      delete memoryStore[key];
      await AsyncStorage.removeItem(key);
    } catch (e) {
      delete memoryStore[key];
    }
  },
};

export const StorageService = {
  async getLanguage() {
    return (await safeStorage.getItem('@bykse_language')) || 'en';
  },
  async setLanguage(lang) {
    await safeStorage.setItem('@bykse_language', lang);
  },

  async getUserSession() {
    const raw = await safeStorage.getItem('@bykse_user_session');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },
  async setUserSession(user) {
    await safeStorage.setItem('@bykse_user_session', JSON.stringify(user));
  },
  async clearUserSession() {
    await safeStorage.removeItem('@bykse_user_session');
  },

  async getActiveBooking() {
    const raw = await safeStorage.getItem('@bykse_active_booking');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },
  async setActiveBooking(booking) {
    await safeStorage.setItem('@bykse_active_booking', JSON.stringify(booking));
  },
  async clearActiveBooking() {
    await safeStorage.removeItem('@bykse_active_booking');
  },

  async getSavedAddresses() {
    const raw = await safeStorage.getItem('@bykse_saved_places');
    if (!raw) {
      return [
        { id: 'home', title: 'Home', address: 'Flat 402, Green Glen Layout, Bellandur', icon: 'home' },
        { id: 'work', title: 'Work', address: 'ECOSPACE Business Park, Outer Ring Rd', icon: 'briefcase' },
      ];
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  },
  async setSavedAddresses(places) {
    await safeStorage.setItem('@bykse_saved_places', JSON.stringify(places));
  },
};
