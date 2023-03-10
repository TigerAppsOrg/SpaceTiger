import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import { Link } from "react-router-dom";
import ReviewItem from "../Details/components/ReviewItem";
import { Loader } from "../../components/Loader";
// import { UserContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  block: {
    padding: "30px",
  },

  reviewItem: {
    padding: "15px",
    width: "100%",
    border: "1px solid #b8b8b8",
    display: "flex",
    flexDirection: "column",
  },
}));

const ApprovalDissaproval = ({ handleClick, reviewId, reportId }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Grid
      item
      xs={12}
      container
      alignItems="flex-end"
      justifyContent="space-between"
      style={{ marginTop: "8px" }}
    >
      <Grid item>
        <LoadingButton
          startIcon={<DoneIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(true, reviewId, reportId);
          }}
          loading={loading}
          variant="outlined"
          color="secondary"
        >
          Keep Review
        </LoadingButton>
      </Grid>
      <Grid item>
        <LoadingButton
          startIcon={<CloseIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(false, reviewId, reportId);
          }}
          loading={loading}
          variant="outlined"
          color="error"
        >
          Delete Review
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default function ReportedReviews() {
  const classes = useStyles();
  const [numReviews, setNumReviews] = useState(3);
  const [reportsData, setReportsData] = useState(null);
  // const { user } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleReport = (keep, reviewId, reportId) => {
    // console.log("keep", keep);
    // console.log("reviewid", reviewId);
    // console.log("reviewid", reportId);

    // keep review, delete the report
    if (keep) {
      axios
        .delete(`/reports/${reportId}`)
        .then((res) => {
          //   let data = res.data;
          console.log("Success!");
          getReports();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(`/reviews/${reviewId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            getReports();
          } else {
            // TODO: show server error modal
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const getReports = () => {
    axios
      .get("/reports")
      .then((res) => {
        let data = res.data;
        setReportsData(data);
        setLoaded(true);
      })
      .catch((err) => {
        setLoaded(true);
        setError(true);
        console.log(err);
      });
  };

  useEffect(() => {
    getReports();
    // eslint-disable-next-line
  }, []);

  const ReviewItems = () => {
    if (reportsData?.length === 0) {
      return (
        <Grid item>
          <Typography variant="body1" color="initial">
            No reviews have been reported at this time.
          </Typography>
        </Grid>
      );
    }
    return reportsData?.slice(0, numReviews).map((r, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Typography variant="p" style={{ fontSize: "20px" }}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/search/${r.review?.spaceid}`}
            >
              <b>{r.space_name}</b>
            </Link>
          </Typography>
          <ReviewItem reported key={index} review={r.review} />
          <div className={classes.reviewItem}>
            <Typography variant="p">
              <b>Report:</b>
            </Typography>
            {r.content}
          </div>
          <ApprovalDissaproval
            reviewId={r.review_id}
            reportId={r.id}
            handleClick={handleReport}
          />
        </Grid>
      );
    });
  };

  const handleViewMore = () => {
    if (numReviews + 4 > reportsData?.length) {
      setNumReviews(reportsData?.length);
    } else {
      setNumReviews(numReviews + 4);
    }
  };

  return (
    <Grid item container className={classes.block} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Reported Reviews</Typography>
      </Grid>
      {error && loaded && (
        <Grid item>
          <Typography variant="body1" color="initial">
            A server error occurred. Please contact the system administrator.
          </Typography>
        </Grid>
      )}
      {!loaded && <Loader />}
      {!error && loaded && (
        <>
          <ReviewItems />
          {numReviews < reportsData?.length && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleViewMore}
                fullWidth
              >
                {/* <IconButton aria-label="load more"> */}
                <AddIcon />
                {/* </IconButton> */}
              </Button>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}
