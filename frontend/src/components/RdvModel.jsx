import * as React from "react";
import { Modal, Typography, Box } from "@mui/material";
import { InfoCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function RdvModal({ closeModal, open }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InfoCircleTwoTone size={100} />
          <Typography>
            Vous devez s'inscrire pour prendre un rendez-vous
          </Typography>
          <Link to={"/login"}>
            <Button type="primary">S'inscrire maintenant !</Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
