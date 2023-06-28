import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useGallery } from "./src/use-gallery";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";
import BigImageModal from "./src/BigImageModal";

export default function App() {
  const {
    imagesWithAddButton,
    pickImages,
    deleteImage,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isOpenDropDown,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImageModalVisible,
    openBigImageModal,
    closeBigImageModal,
    selectedImage,
    selectImage,
  } = useGallery();

  const width = Dimensions.get("screen").width;
  const columnSize = width / 3;

  const onPressOpenGallery = () => {
    pickImages();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);

  const onPressAddAlbum = () => {
    openTextInputModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;
    addAlbum();
    closeTextInputModal();
    resetAlbumTitle();
  };

  const onPressTextInputModalBackdrop = () => closeTextInputModal();
  const onPressBigImageModalBackdrop = () => closeBigImageModal();

  const onPressHeader = () => {
    if (isOpenDropDown) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  };

  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  };

  const onPressImage = (image) => {
    selectImage(image);
    openBigImageModal();
  };

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
    <SafeAreaView style={styles.container}>
      {/* 앨범 드롭다운, 앨범 추가 버튼 */}
      <MyDropDownPicker
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        isOpenDropDown={isOpenDropDown}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />

      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />

      {/* 이미지 확대 모달 */}
      <BigImageModal
        modalVisible={bigImageModalVisible}
        onPressBackdrop={onPressBigImageModalBackdrop}
        selectedImage={selectedImage}
      />

      {/* 이미지 리스트 */}
      <FlatList
        style={{ zIndex: -1 }}
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
