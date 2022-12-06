import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";

import CloseIcon from "@mui/icons-material/Close";

import { UserContext } from "../../../context.js";

import useStyles from "../styles.js";

export default function ReportModal(props) {
  const { id, open, handleClose } = props;
  const classes = useStyles();
  const { query } = useParams();
  const { user } = useContext(UserContext);

  const [status, setStatus] = useState("none");
  const [message, setMessage] = useState("");

  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setStatus("none");
    setMessage("");
    setSubmitted(false);
    setDesc("");
    handleClose();
  };

  const handleSubmit = () => {
    // this is where the dispatch/fetch is

    // error handling
    setSubmitted(true);

    if (desc === "") {
      console.log("inputs are invalid");
      return;
    }

    const reviewResponse = {
      review_id: id,
      content: desc,
      puid: user.netid,
    };

    // if (user) {
    //   axios
    //     .post("/reviews", reviewResponse)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         setStatus("success");
    //         setMessage(
    //           "Thank you for submitting a report. An administrator will review it soon. "
    //         );
    //         closeModal();
    //         // navigate("/profile");
    //       } else {
    //         // TODO: show server error modal
    //         console.log(res);
    //         setStatus("error");
    //         setMessage("Adding the space failed. Please try again later. ");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setStatus("error");
    //       setMessage(
    //         "An error occured with our systems. Please try again later."
    //       );
    //       console.log(status);
    //       console.log(message);
    //     });
    // } else {
    //   // TODO: show modal that user must login before performing
    //   // such an actions
    //   console.log("user unauthenticated, can't create a space");
    //   setStatus("error");
    //   setMessage("User unauthenticated, can't create a space!");
    // }
    console.log(reviewResponse);
    closeModal(); // to be deleted
    // handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="review-modal"
      aria-describedby="review"
    >
      <Box className={classes.modalContainer}>
        <div className={classes.modalHeader}>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Report a Review
          </Typography>
          <IconButton aria-label="close" onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.modalForm}>
          {/* skipping image upload until we have backend :) */}

          <Typography variant="h6">Tell us about the problem</Typography>
          <TextField
            id="outlined-exp"
            label="Tell us about the problem"
            placeholder="What seems to be wrong?"
            value={desc}
            multiline
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            style={{ width: "100%", marginBottom: "20px" }}
            rows={3}
            error={submitted && desc === ""}
          />
          <div
            className={classes.headerBtns}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disableelevationevation
              onClick={handleSubmit}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Post
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}