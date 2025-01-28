import { Alert as MA } from "@mui/material";

interface PropsType {
  message: string;
}

function Alert({ message }: PropsType) {
  return (
    <MA
      variant="filled"
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        padding: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
      severity="error"
      icon={false}
    >
      {message}
    </MA>
  );
}

export default Alert;
