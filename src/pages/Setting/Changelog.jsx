import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import DoritoImage from '../../assets/images/Dorito.png';
import {Colors, Icons} from '../../utils';

const {Ionicons, Entypo} = Icons;

const Changelog = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FastImage
          source={DoritoImage}
          style={{
            width: '40%',
            aspectRatio: 1,
            marginBottom: 12,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.title}>Dorito</Text>
        <Text style={styles.subtitle}>Ver 1.5.0</Text>
      </View>

      <ScrollView>
        <Text style={styles.contentTitle}>版本 1.5.0 更新內容</Text>

        <View style={styles.contentSection}>
          <View style={styles.titleRow}>
            <Ionicons name="trending-up" size={20} color={Colors.PRIMARY} />
            <Text style={styles.contentSubtitle}>功能升級</Text>
          </View>
          <Text style={styles.contentDescription}>
            搜尋頁面現在能夠搜尋並使用高畫質圖片了！
          </Text>
          <Text style={styles.contentDescription}>
            新增設定頁面，未來將有更多功能加入！
          </Text>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.titleRow}>
            <Entypo name="tools" size={20} color={Colors.PRIMARY} />
            <Text style={styles.contentSubtitle}>問題修復</Text>
          </View>
          <Text style={styles.contentDescription}>修復部分文字跑版的問題</Text>
          <Text style={styles.contentDescription}>
            修復部分卡片及按鈕的陰影未顯示的問題
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Changelog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.Yellow,
    fontFamily: 'sans-serif-condensed',
    textShadowColor: Colors.GRAY,
    textShadowOffset: {width: 0, height: 0.5},
    textShadowRadius: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.Yellow,
    fontFamily: 'sans-serif-condensed',
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TITLE,
    marginBottom: 24,
  },
  contentSection: {
    marginBottom: 16,
  },
  contentSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.PRIMARY,
    marginBottom: 12,
  },
  contentDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    color: Colors.PARAGRAPH,
    backgroundColor: Colors.WHITE,
    marginBottom: 8,
    elevation: 2,
  },
});
