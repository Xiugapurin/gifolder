import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import DoritoImage from '../../assets/images/Dorito.png';
import {Colors, Icons} from '../../utils';

const {Ionicons, Entypo} = Icons;

const RenderSections = ({item}) => {
  return (
    <View key={item.key} style={styles.section}>
      <Text style={styles.sectionTitle}>{item.name}</Text>
      {item.buttons.map(button => (
        <TouchableOpacity
          key={button.key}
          style={styles.button}
          activeOpacity={0.8}
          onPress={button.onPress}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {button.icon}
            <Text style={styles.buttonTitle}>{button.title}</Text>
          </View>
          <Text style={styles.buttonDescription}>{button.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Setting = ({navigation}) => {
  const ClearCache = () => {
    try {
      FastImage.clearDiskCache();
    } catch (error) {
      ToastAndroid.showWithGravity(
        '清除快取時發生錯誤',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } finally {
      ToastAndroid.showWithGravity(
        '已成功清理快取！',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const Sections = [
    {
      key: 'sec-1',
      name: '偏好設置',
      buttons: [
        {
          key: 'sec-1-btn-1',
          icon: <Ionicons name="moon-sharp" size={20} color={Colors.TITLE} />,
          title: '深夜模式',
          description: '即將推出',
          onPress: null,
        },
        {
          key: 'sec-1-btn-2',
          icon: (
            <Ionicons
              name="extension-puzzle-sharp"
              size={20}
              color={Colors.TITLE}
            />
          ),
          title: '禁用快取',
          description: '即將推出',
          onPress: null,
        },
      ],
    },
    {
      key: 'sec-2',
      name: '其他功能',
      buttons: [
        {
          key: 'sec-2-btn-1',
          icon: <Entypo name="trash" size={20} color={Colors.TITLE} />,
          title: '清除快取',
          description: '釋放硬碟空間',
          onPress: ClearCache,
        },
        {
          key: 'sec-2-btn-2',
          icon: <Entypo name="cloud" size={20} color={Colors.TITLE} />,
          title: '雲端備份',
          description: '即將推出',
          onPress: null,
        },
        {
          key: 'sec-2-btn-3',
          icon: <Ionicons name="images" size={20} color={Colors.TITLE} />,
          title: '公用相簿',
          description: '即將推出',
          onPress: null,
        },
      ],
    },
    {
      key: 'sec-3',
      name: '關於',
      buttons: [
        {
          key: 'sec-3-btn-1',
          icon: <Entypo name="book" size={20} color={Colors.TITLE} />,
          title: '更新日誌',
          description: '',
          onPress: () => {
            navigation.push('Changelog');
          },
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings-sharp" color={Colors.TITLE} size={32} />
        <Text style={styles.title}>設定</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}
        data={Sections}
        renderItem={RenderSections}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.PRIMARY,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 3,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.TITLE,
  },
  buttonDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.TITLE,
  },
});
