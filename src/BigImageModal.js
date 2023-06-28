import { Image, Modal, Pressable, View } from "react-native";

export default ({ modalVisible, onPressBackdrop, selectedImage }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable
        style={{
          flex: 1,
          // backgroundColor: "gray",
          // opacity: 0.5,
          backgroundColor: "rgba(115, 115, 115, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onPressBackdrop}
      >
        <Pressable>
          <Image
            style={{ width: 320, height: 320, backgroundColor: "white" }}
            resizeMode="contain"
            source={{ uri: selectedImage?.uri }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};
