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

const useCreateUpdatesTable = () => {
  const checkOrCreateTable = () => {
    return new Promise(resolve => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT name FROM sqlite_master WHERE type="table" AND name="updates";',
          [],
          (_, {rows}) => {
            if (rows.length === 0) {
              // 表格不存在，創建它
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS ' +
                  'updates ' +
                  '(id INTEGER PRIMARY KEY AUTOINCREMENT, is_updated BOOLEAN DEFAULT 0, update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
                [],
                () => {
                  console.log('updates 資料表已創建');
                  tx.executeSql(
                    'INSERT INTO updates (is_updated) VALUES (?);',
                    [0],
                    () => {
                      resolve(false);
                    },
                    handleSqlError,
                  );
                },
                handleSqlError,
              );
            } else {
              // 表格已存在，查詢最後一筆記錄的 "is_updated" 值
              tx.executeSql(
                'SELECT is_updated FROM updates ORDER BY id DESC LIMIT 1;',
                [],
                (_, {rows}) => {
                  const latestIsUpdated = rows.item(0)?.is_updated;
                  if (latestIsUpdated !== undefined) {
                    resolve(latestIsUpdated);
                  }
                  resolve(false); // 返回是否已更新
                },
                handleSqlError,
              );
            }
          },
          handleSqlError,
        );
      });
    });
  };

  const handleSqlError = error => {
    console.log('SQL error:', error);
  };

  return {checkOrCreateTable};
};

const useFetchUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdatesFromDB = () => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT is_updated FROM updates;`,
          [],
          (tx, results) => {
            const rows = results.rows;
            const updatesArray = [];

            for (let i = 0; i < rows.length; i++) {
              updatesArray.push(rows.item(i));
            }

            setUpdates(updatesArray);
            setIsLoading(false);
          },
          error => {
            console.log('SQL error:', error);
            setIsLoading(false);
          },
        );
      });
    };

    fetchUpdatesFromDB();
  }, []);

  return {updates};
};

const useSetIsUpdatedToTrue = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setIsUpdatedToTrue = async () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE updates SET is_updated = ? WHERE id = (SELECT id FROM updates ORDER BY id DESC LIMIT 1);',
        [1],
        () => {
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

  return {setIsUpdatedToTrue, isLoading, error};
};

const useDeleteUpdatesTable = () => {
  const [error, setError] = useState(null);

  const deleteUpdatesTable = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE IF EXISTS updates',
          [],
          () => {
            console.log('updates 資料表已刪除');
            setError(null);
          },
          error => {
            console.log('SQL error:', error);
            console.log('刪除 updates 資料表失敗');
            setError('刪除 updates 資料表失敗');
          },
        );
      });
    } catch (error) {
      console.log('發生錯誤:', error);
      setError('發生錯誤');
    }
  };

  return {deleteUpdatesTable, error};
};

const useCreateSettingsTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createTable = () => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS settings ' +
            '(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, user_name TEXT, user_image_uri TEXT, theme TEXT, is_disable_cache BOOLEAN DEFAULT 0, update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',
          [],
          () => {
            console.log('settings資料表創建成功');
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

export {
  useCreateUpdatesTable,
  useFetchUpdates,
  useSetIsUpdatedToTrue,
  useDeleteUpdatesTable,
  useCreateSettingsTable,
};
