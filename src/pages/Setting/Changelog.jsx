import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import DoritoImage from '../../assets/images/Dorito.png';
import {Colors, Icons} from '../../utils';

const {Ionicons, Entypo} = Icons;

const Changelog = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FastImage
          source={DoritoImage}
          style={{
            width: '36%',
            aspectRatio: 1,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.title}>Dorito</Text>
        <Text style={styles.subtitle}>Ver 1.5.0</Text>
      </View>

      <Text style={styles.contentTitle}>版本 1.5.0 更新內容</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentSection}>
          <View style={styles.titleRow}>
            <Ionicons name="trending-up" size={20} color={Colors.PRIMARY} />
            <Text style={styles.contentSubtitle}>功能升級</Text>
          </View>
          <Text style={styles.contentDescription}>
            搜尋頁面現在能夠搜尋並使用高畫質圖片了！
          </Text>
          <Text style={styles.contentDescription}>
            搜尋頁面現在搜尋時將會顯示搜尋建議！
          </Text>
          <Text style={styles.contentDescription}>
            搜尋欄現在不需要按下 Enter 就能搜尋！
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

        <View style={styles.contentSection}>
          <View style={styles.titleRow}>
            <Ionicons name="color-palette" size={20} color={Colors.PRIMARY} />
            <Text style={styles.contentSubtitle}>其他更新</Text>
          </View>
          <Text style={styles.contentDescription}>
            將主頁的搜尋欄輸入限制放寬至 20 字
          </Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => {
            navigation.pop();
          }}>
          <Ionicons name="chevron-back" color={Colors.PARAGRAPH} size={20} />
          <Text style={styles.backButtonText}>回設定頁</Text>
        </TouchableOpacity>
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
    marginBottom: 36,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    marginBottom: 24,
    color: Colors.TITLE,
  },
  contentSection: {
    marginBottom: 16,
  },
  contentSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.PRIMARY,
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 40,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    color: Colors.PARAGRAPH,
  },
});
