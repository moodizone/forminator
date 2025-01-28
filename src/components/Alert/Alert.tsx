import { Alert as MA } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

function Alert({ error }: FallbackProps) {
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
      {error?.message}
    </MA>
  );
}

export default Alert;
