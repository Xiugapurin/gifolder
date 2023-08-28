import {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'default.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log('SQLite error:', error);
  },
);

const useFetchImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagesFromDB = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Images',
          [],
          (tx, results) => {
            const rows = results.rows;
            const imagesArray = [];

            for (let i = 0; i < rows.length; i++) {
              imagesArray.push(rows.item(i));
            }

            setImages(imagesArray);
            setLoading(false);
          },
          error => {
            console.log('SQL error:', error);
            setError('取得圖片資料失敗');
            setLoading(false);
          },
        );
      });
    };

    fetchImagesFromDB();
  }, []);

  return {images, loading, error};
};

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(null);

  const createTable = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ' +
            'images ' +
            '(ID INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT NOT NULL, name TEXT, tag TEXT, upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
          [],
          () => {
            console.log('資料表創建成功');
            resolve(); // 資料表創建成功後 resolve
          },
          error => {
            console.log('SQL error:', error);
            setError('發生錯誤');
            reject(error); // 發生錯誤時 reject
          },
        );
      });
    });
  };

  const uploadImage = async (imageURI, name, tag) => {
    setUploading(true);

    try {
      await createTable(); // 等待資料表創建完成

      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO images (uri, name, tag) VALUES (?, ?, ?)',
          [imageURI, name, tag],
          () => {
            console.log('圖片已上傳並保存');
            setComplete(true);
          },
          error => {
            console.log('SQL error:', error);
            setError('圖片保存失敗');
          },
        );
      });
    } catch (error) {
      console.log('發生錯誤:', error);
      setError('發生錯誤');
    } finally {
      setUploading(false);
    }
  };

  return {uploadImage, uploading, complete, error};
};

export {useFetchImages, useImageUpload};
