import { Box, Button, Modal, useMediaQuery } from "@mui/material";
import React from "react";
import { Form } from "../Form/Form";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export const FormModal = ({ show, handleClose, currentId, setCurrentId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Modal
      open={show}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose();
        }
      }}
      disableEscapeKeyDown={true}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "95%" : "60%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Form
          currentId={currentId}
          setCurrentId={setCurrentId}
          handleClose={handleClose}
        />
      </Box>
    </Modal>
  );
};
