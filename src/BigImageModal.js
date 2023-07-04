import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 16,
        height: "100%",
        justifyContent: "center",
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons
        name={iconName}
        size={36}
        color={disabled ? "transparent" : "black"}
      />
    </TouchableOpacity>
  );
};

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ArrowButton
            iconName={"keyboard-arrow-left"}
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />

          <Pressable>
            <Image
              style={{ width: 320, height: 320, backgroundColor: "white" }}
              resizeMode="contain"
              source={{ uri: selectedImage?.uri }}
            />
          </Pressable>

          <ArrowButton
            iconName={"keyboard-arrow-right"}
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
