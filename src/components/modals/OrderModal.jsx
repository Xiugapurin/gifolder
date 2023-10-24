import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Icons} from '../../utils';

const {Ionicons} = Icons;

const orderByOptions = [
  {
    label: '上傳時間',
    value: 'upload_time',
    orderOptions: [
      {label: '最新', value: 'DESC'},
      {label: '最早', value: 'ASC'},
    ],
  },
  {
    label: '圖片名稱',
    value: 'title',
    orderOptions: [
      {label: 'A-Z', value: 'ASC'},
      {label: 'Z-A', value: 'DESC'},
    ],
  },
];

const OrderModal = ({toggleModal, orderBy, setOrderBy, order, setOrder}) => {
  const [orderByOptionIndex, setOrderByOptionIndex] = useState(
    orderByOptions.findIndex(option => option.value === orderBy),
  );
  const [orderOptionIndex, setOrderOptionIndex] = useState(
    orderByOptions[orderByOptionIndex % 2].orderOptions.findIndex(
      option => option.value === order,
    ),
  );

  const currentOrderBy = orderByOptions[orderByOptionIndex % 2];
  const currentOrder =
    orderByOptions[orderByOptionIndex % 2].orderOptions[orderOptionIndex % 2];

  const toggleOrderBy = () => {
    setOrderByOptionIndex(prev => prev + 1);
    setOrderOptionIndex(0);
  };

  const toggleOrder = () => {
    setOrderOptionIndex(prev => prev + 1);
  };

  const onApply = () => {
    setOrderBy(currentOrderBy.value);
    setOrder(currentOrder.value);

    toggleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="filter" color={Colors.TITLE} size={20} />
            <Text style={styles.title}>設定排序</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="close" size={24} color={Colors.PARAGRAPH} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.filterButtonTitle}>點擊按鈕切換排序方式</Text>
          <View style={styles.filterButtonRow}>
            {/* OrderBy button */}
            <Text style={styles.filterButtonRowTitle}>依據</Text>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={toggleOrderBy}>
              <Text style={styles.filterButtonText}>
                {currentOrderBy.label}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterButtonRow}>
            {/* OrderButton */}
            <Text style={styles.filterButtonRowTitle}>順序</Text>
            <TouchableOpacity style={styles.filterButton} onPress={toggleOrder}>
              <Text style={styles.filterButtonText}>{currentOrder.label}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.footerButton,
              {backgroundColor: Colors.WHITE, elevation: 0},
            ]}
            onPress={toggleModal}>
            <Text style={[styles.footerButtonText, {color: Colors.PARAGRAPH}]}>
              取消
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={onApply}>
            <Ionicons name="checkmark-sharp" color={Colors.WHITE} size={20} />
            <Text style={[styles.footerButtonText, {marginLeft: 4}]}>
              套用設定
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  content: {
    marginBottom: 24,
    alignItems: 'center',
  },
  filterButtonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
    marginBottom: 24,
  },
  filterButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterButtonRowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
  filterButton: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 3,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Colors.PRIMARY,
    elevation: 1,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});
