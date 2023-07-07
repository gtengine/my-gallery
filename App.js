import { Alert, SafeAreaView, StyleSheet } from "react-native";
import BigImageModal from "./src/BigImageModal";
import ImageList from "./src/ImageList";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";
import { useGallery } from "./src/use-gallery";

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
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImages();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);

  const onPressWatchAd = () => {
    console.log("ad");
  };

  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert("앨범 추가 생성은 광고를 시청해야 합니다.", "", [
        {
          style: "cancel",
          text: "닫기",
        },
        {
          text: "광고 보기",
          onPress: onPressWatchAd,
        },
      ]);
    } else {
      openTextInputModal();
    }
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

  const onPressLeftArrow = () => moveToPreviousImage();
  const onPressRightArrow = () => moveToNextImage();

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
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />

      {/* 이미지 리스트 */}
      <ImageList
        imagesWithAddButton={imagesWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onLongPressImage={onLongPressImage}
        onPressImage={onPressImage}
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
