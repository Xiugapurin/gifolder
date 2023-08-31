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

const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'images ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT NOT NULL, title TEXT, aspect_ratio INTEGER, upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
        [],
        () => {
          console.log('資料表創建成功');
          resolve(); // 資料表創建成功後 resolve
        },
        error => {
          console.log('SQL error:', error);
          reject(error); // 發生錯誤時 reject
        },
      );
    });
  });
};

const useFetchImages = searchParam => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onRefresh = () => setIsLoading(true);

  useEffect(() => {
    const fetchImagesFromDB = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Images WHERE title LIKE ? OR uri LIKE ?',
          [`%${searchParam}%`, `%${searchParam}%`],
          (tx, results) => {
            const rows = results.rows;
            const imagesArray = [];

            for (let i = 0; i < rows.length; i++) {
              imagesArray.push(rows.item(i));
            }

            setImages(imagesArray);
            setIsLoading(false);
          },
          error => {
            console.log('SQL error:', error);
            setError('取得圖片資料失敗');
            setIsLoading(false);
          },
        );
      });
    };

    fetchImagesFromDB();
  }, [searchParam, isLoading]);

  return {images, isLoading, onRefresh, error};
};

const useFetchImagesBySearchParam = searchParam => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onRefresh = () => setIsLoading(true);

  useEffect(() => {
    const fetchImagesFromDB = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Images WHERE title LIKE ? OR uri LIKE ?',
          [`%${searchParam}%`, `%${searchParam}%`],
          (tx, results) => {
            const rows = results.rows;
            const imagesArray = [];

            for (let i = 0; i < rows.length; i++) {
              imagesArray.push(rows.item(i));
            }

            setImages(imagesArray);
            setIsLoading(false);
          },
          error => {
            console.log('SQL error:', error);
            setError('取得圖片資料失敗');
            setIsLoading(false);
          },
        );
      });
    };

    fetchImagesFromDB();
  }, [searchParam, isLoading]);

  return {images, isLoading, onRefresh, error};
};

const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (imageURI, title, aspectRatio) => {
    setUploading(true);

    try {
      await createTable(); // 等待資料表創建完成

      if (title === '') title = '無標題';

      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO images (uri, title, aspect_ratio) VALUES (?, ?, ?)',
          [imageURI, title, aspectRatio],
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

const useDeleteImage = () => {
  const [error, setError] = useState(null);

  const deleteImage = async imageID => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Images WHERE ID = ?',
          [imageID],
          () => {
            console.log('圖片已刪除');
            setError(null);
          },
          error => {
            console.log('SQL error:', error);
            console.log('圖片刪除失敗');
            setError('圖片刪除失敗');
          },
        );
      });
    } catch (error) {
      console.log('發生錯誤:', error);
      setError('發生錯誤');
    }
  };

  return {deleteImage, error};
};

const useDeleteImagesTable = () => {
  const [error, setError] = useState(null);

  const deleteImagesTable = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE IF EXISTS Images',
          [],
          () => {
            console.log('Images 資料表已刪除');
            setError(null);
          },
          error => {
            console.log('SQL error:', error);
            console.log('刪除 Images 資料表失敗');
            setError('刪除 Images 資料表失敗');
          },
        );
      });
    } catch (error) {
      console.log('發生錯誤:', error);
      setError('發生錯誤');
    }
  };

  return {deleteImagesTable, error};
};

export {
  useFetchImages,
  useFetchImagesBySearchParam,
  useUploadImage,
  useDeleteImage,
  useDeleteImagesTable,
};
