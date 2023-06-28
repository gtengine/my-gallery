import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const headerHeight = 52;

export default ({
  selectedAlbum,
  onPressAddAlbum,
  onPressHeader,
  isOpenDropDown,
  albums,
  onPressAlbum,
  onLongPressAlbum,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={onPressHeader}
        activeOpacity={1}
      >
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
        <MaterialIcons
          name={isOpenDropDown ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 12,
          }}
          onPress={onPressAddAlbum}
        >
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {isOpenDropDown && (
        <View
          style={{
            position: "absolute",
            top: headerHeight,
            width: "100%",
            borderBottomColor: "lightgray",
            borderBottomWidth: 0.5,
            borderTopColor: "lightgray",
            borderTopWidth: 0.5,
          }}
        >
          {albums.map((album, index) => {
            const isSelectedAlbum = album.id === selectedAlbum.id;
            return (
              <TouchableOpacity
                key={`album-${index}`}
                style={{
                  paddingVertical: 12,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                }}
                activeOpacity={1}
                onPress={() => onPressAlbum(album)}
                onLongPress={() => onLongPressAlbum(album.id)}
              >
                <Text
                  style={{ fontWeight: isSelectedAlbum ? "bold" : undefined }}
                >
                  {album.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
