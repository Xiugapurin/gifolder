import {useState} from 'react';
import {API_BASE_URL, API_TOKEN} from '@env';

const useUploadImage = () => {
  const [error, setError] = useState('');

  const uploadImage = async imageFile => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_BASE_URL}/image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: formData,
      });

      console.log(response.ok);
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
    }
  };

  return {uploadImage, error};
};

export default useUploadImage;
