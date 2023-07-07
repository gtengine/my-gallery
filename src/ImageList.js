import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const width = Dimensions.get("screen").width;
const minColumnSize = width >= 500 ? 200 : 130;
const divisor = width / minColumnSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

export default ({
  imagesWithAddButton,
  onPressOpenGallery,
  onLongPressImage,
  onPressImage,
}) => {
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgray",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPressOpenGallery}
        >
          <Text style={{ fontSize: 60, fontWeight: "200" }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onLongPress={() => onLongPressImage(id)}
        onPress={() => onPressImage(image)}
      >
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={{ zIndex: -1 }}
      data={imagesWithAddButton}
      renderItem={renderItem}
      numColumns={numColumns}
    />
  );
};
