import Avatar from "@material-ui/core/Avatar";
import Image from "next/image";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useTheme } from "@material-ui/core/styles";

const StyledAvatar = ({ image, text, ...props }) => {
  const theme = useTheme();
  return (
    <Avatar
      alt={"avatar"}
      {...props}
    >
      {image ? (
        <Image src={image} layout="fill" />
      ) : (
        (text && text.charAt(0).toUpperCase()) || (
          <AccountCircleIcon size={40} style={{ color: theme.palette.grey.title }} />
        )
      )}
    </Avatar>
  );
};

export default StyledAvatar;
