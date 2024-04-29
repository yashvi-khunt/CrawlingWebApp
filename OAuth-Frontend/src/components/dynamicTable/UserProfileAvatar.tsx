import { Stack, Avatar } from "@mui/material";
import { stringToColor } from "../../utils/helperFunctions/stringToColor";

const UserProfileAvatar = ({ name }: { name: string }) => {
  const initials = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center" sx={{ gap: 1 }}>
        <Avatar
          sx={{
            bgcolor: stringToColor(name),
            fontSize: "15px",
            height: "36px",
            width: "36px",
          }}
        >
          {initials}
        </Avatar>
        {name}
      </Stack>
    </>
  );
};

export default UserProfileAvatar;
