import { Box } from "@mui/system";

const UserImage = ({ image , size="60px"}) => {
    <Box
        width={size}
        height={size}
    >
        <img
        style={{objectFit: "cover", borderRadius: "50%"}}
        width={size}
        height={size}
        alt="user"
        src={`https://localhost:3001/assets/${image}`}
        /> 

    </Box>
}

export default UserImage;