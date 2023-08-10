import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View,} from 'react-native';
import Modal from 'react-native-modal';

const BottomModal = () => {
  const [visibleModal, setVisibleModal] = useState(true);

  const renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Hello!</Text>
      {renderButton('Close', () => setVisibleModal(false))}
    </View>
  );

  return (
    <View style={styles.container}>

      <Modal
        isVisible={visibleModal === true}
        transparent={true}
        style={styles.bottomModal}>
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default BottomModal;