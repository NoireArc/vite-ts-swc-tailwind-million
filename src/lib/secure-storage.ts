import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "your-encryption-key";

const SecureStorage = {
  setItem: async (key: string, value: any): Promise<boolean> => {
    try {
      const encryptedKey = CryptoJS.AES.encrypt(key, ENCRYPTION_KEY).toString();
      const encryptedValue = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        ENCRYPTION_KEY
      ).toString();
      await localStorage.setItem(encryptedKey, encryptedValue);
      return true;
    } catch (error) {
      console.error("Error setting item in SecureStorage:", error);
      return false;
    }
  },

  getItem: async (key: string): Promise<any> => {
    try {
      const encryptedKey = CryptoJS.AES.encrypt(key, ENCRYPTION_KEY).toString();
      const encryptedValue = await localStorage.getItem(encryptedKey);
      if (!encryptedValue) return null;

      const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return decryptedData;
    } catch (error) {
      console.error("Error getting item from SecureStorage:", error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<boolean> => {
    try {
      const encryptedKey = CryptoJS.AES.encrypt(key, ENCRYPTION_KEY).toString();
      await localStorage.removeItem(encryptedKey);
      return true;
    } catch (error) {
      console.error("Error removing item from SecureStorage:", error);
      return false;
    }
  },

  clear: async (): Promise<boolean> => {
    try {
      await localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing SecureStorage:", error);
      return false;
    }
  },
};

export default SecureStorage;
