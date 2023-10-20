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

const useCreateTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createTable = () => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ' +
            'images ' +
            '(ID INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT NOT NULL, title TEXT, aspect_ratio INTEGER, upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
          [],
          () => {
            console.log('資料表創建成功');
            setIsLoading(false);
          },
          error => {
            console.log('SQL error:', error);
            setIsLoading(false);
            setError('發生錯誤，請稍後再試');
          },
        );
      });
    };

    createTable();
  });

  return {isLoading, error};
};

const useFetchImages = (
  searchParam,
  orderBy = 'upload_time',
  order = 'DESC',
) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onRefresh = () => setIsLoading(true);

  useEffect(() => {
    const fetchImagesFromDB = () => {
      const orderByClause = `ORDER BY ${orderBy} ${order}`;

      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Images WHERE title LIKE ? OR uri LIKE ? ${orderByClause}`,
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
  }, [searchParam, orderBy, order, isLoading]);

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
      imageTitle = title === '' ? '無標題' : title;

      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO images (uri, title, aspect_ratio) VALUES (?, ?, ?)',
          [imageURI, imageTitle, aspectRatio],
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
      setError('發生錯誤，請稍後再試');
    } finally {
      setUploading(false);
    }
  };

  return {uploadImage, uploading, complete, error};
};

const useUpdateImage = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateImageTitle = async (imageID, title) => {
    setUpdating(true);

    try {
      const newTitle = title === '' ? '無標題' : title;

      db.transaction(tx => {
        tx.executeSql(
          'UPDATE images SET title = ? WHERE ID = ?',
          [newTitle, imageID],
          () => {
            console.log('圖片標題已更新');
            setComplete(true);
          },
          dbError => {
            console.log('SQL error:', dbError);
            setError('更新圖片標題失敗');
          },
        );
      });
    } catch (error) {
      console.log('發生錯誤:', error);
      setError('發生錯誤，請稍後再試');
    } finally {
      setUpdating(false);
    }
  };

  return {updateImageTitle, updating, error};
};

export default useUpdateImage;

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
      setError('發生錯誤，請稍後再試');
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
  useCreateTable,
  useFetchImages,
  useFetchImagesBySearchParam,
  useUploadImage,
  useDeleteImage,
  useDeleteImagesTable,
};
