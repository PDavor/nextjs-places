import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  width: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  bgcolor: "background.paper",
  p: 2,
  px: 4,
  pb: 3,
  width: 600,
};

const CustomModal = (props) => {
  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      {props.children}
    </StyledModal>
  );
};

export default CustomModal;
