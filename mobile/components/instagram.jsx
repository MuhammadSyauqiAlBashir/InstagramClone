import { Image } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 50 }}
      source={{
        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png",
      }}
    />
  );
}
export default LogoTitle;
