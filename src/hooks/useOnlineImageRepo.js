import {useState} from 'react';
import {
  IMGUR_API_BASE_URL,
  IMGUR_API_TOKEN,
  TENOR_API_BASE_URL,
  TENOR_API_KEY,
  TENOR_CLIENT_KEY,
} from '@env';

const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const uploadImage = async imageFile => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${IMGUR_API_BASE_URL}/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${IMGUR_API_TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('圖片上傳失敗');
      }

      const responseData = await response.json();
      if (responseData.data && responseData.data.link) {
        // 返回成功，並回傳圖片的連結
        return responseData.data.link;
      } else {
        // 上傳失敗，設置錯誤訊息
        setError('圖片上傳失敗，請稍後再試');
      }
    } catch (error) {
      // 錯誤處理
      console.error('圖片上傳錯誤:', error);
      setError('圖片上傳時發生錯誤');
    } finally {
      setUploading(false);
    }
  };

  return {uploadImage, uploading, error};
};

const useFetchSearchImage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = async searchParam => {
    setIsLoading(true);

    try {
      // 使用 fetch 執行 API 請求
      const response = await fetch(
        `${TENOR_API_BASE_URL}?q=${searchParam}&key=${TENOR_API_KEY}%client_key=${TENOR_CLIENT_KEY}&media_filter=gif`,
      );

      if (!response.ok) {
        throw new Error('API 請求失敗');
      }

      // 解析 JSON 數據
      const data = await response.json();

      // 從 JSON 數據中獲取圖片結果
      const results = data.results || [];

      // 將圖片結果設置到狀態中
      setImages(results);
      setError(null);
    } catch (error) {
      setError('獲取圖片失敗');
    } finally {
      setIsLoading(false);
    }
  };

  return {fetchImage, images, isLoading, error};
};

export {useUploadImage, useFetchSearchImage};
