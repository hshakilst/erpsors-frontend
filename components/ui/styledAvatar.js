import Avatar from "@material-ui/core/Avatar";
import Image from "next/image";

const StyledAvatar = ({ image, text, height, width, style }) => (
  <Avatar alt={"avatar"} style={style}>
    {image ? <Image src={image} layout="fill" /> : text.charAt(0).toUpperCase()}
  </Avatar>
);

export default StyledAvatar;
