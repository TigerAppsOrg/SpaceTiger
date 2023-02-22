import React from "react";
// import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
import ReactRotatingText from "react-rotating-text";
import { Grid, Card, CardContent, requirePropFactory } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import landing from './landing.jpg'

// import { UserContext } from "../context";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
  },

  block: {
    minHeight: "80vh",
    padding: "10%",
    [theme.breakpoints.up("lg")]: {
      padding: "5% 10%",
    },
  },

  image: {
    height: "100%",
    width: "100%",
    margin: "5% 0",
    objectFit: "cover",
  },

  textBox: {
    paddingRight: "10%",
  },

  getStartedButton: {
    textTransform: "none",
  },
}));

const MemberCard = ({ member }) => {
  return (
    <Card raised={true} key={member.name} sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {member.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {member.descrip}
        </Typography>
      </CardContent>
      <CardContent>
        <img
          style={{ objectFit: "cover", borderRadius: 2 }}
          src={member.image}
          alt={member.name}
          height="100%"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

export default function Landing() {
  const classes = useStyles();
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);

  const members = [
    {
      name: "Tyler Benson",
      descrip:
        "I'm a Junior passionate about data science, building random webapps, and climbing! While I'm not coding or climbing I enjoy playing the double bass, surfing, singing, and sleeping.",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1665770123/SpaceTiger/snowman_wgmm8w.jpg",
    },
    {
      name: "Thanya Begum",
      descrip:
        "I'm a junior majoring in Computer Science with a passion for the intersection of technology and design. Outside of classes, you can finding me watching Netflix, listening to music, or crocheting.",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1668629614/SpaceTiger/thanya_vqebct.jpg",
    },
    {
      name: "Chenhan Zhang",
      descrip:
        "I'm a Junior in AB Computer Science. In my free time, I love listening to music and roller skating.",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1668620418/SpaceTiger/IMG_7678_scu9k4.jpg",
    },
    {
      name: "Tri Giao Vu Dinh",
      descrip:
        "I'm a Junior in the COS department with a minor in Neuroscience. In my free time I like to work on music for my acapella group, theater productions, drawing, and playing video games.",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1668373257/SpaceTiger/photo_zu7wd4.jpg",
    },
    {
      name: "Eva Vesely",
      descrip:
        "I'm a Junior studying Computer Science with a certificate in Statistics and Machine Learning. In my free time I like to do yoga, write, and discover new drink recipes at my barista job.",
      image:
        "https://res.cloudinary.com/chickennuggets/image/upload/v1668390229/SpaceTiger/PPic_ye5r3p.jpg",
    },
  ];
  const handleButtonClick = () => {
    navigate("/search");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item container direction="row" className={classes.block}>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          xs={12}
          md={6}
          className={classes.textBox}
        >
          <Typography
            gutterBottom
            style={{ height: "inherit" }}
            variant="h3"
            color="initial"
          >
            Find your new favorite space to&nbsp;
            <ReactRotatingText
              items={[
                "study",
                "hangout",
                "chill",
                "study break",
                "party",
                "host a meeting",
              ]}
              pause={2500}
            />
          </Typography>
          <Typography variant="h5" color="initial" gutterBottom>
            Whether you're looking for a loud, secret, comfy, or any kind of
            space, SpaceTiger makes it easy to search through spots on campus
            that are perfectly suited to your needs.
          </Typography>
          <Grid item style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              fullWidth={false}
              className={classes.getStartButton}
            >
              Get Started
            </Button>
          </Grid>
          {/* )} */}
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            className={classes.image}
            height="100%"
            alt="A tiger in space"
            src={landing}
          />
        </Grid>
      </Grid>
      <Grid item container direction="row" className={classes.block}>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          xs={12}
          md={12}
          className={classes.textBox}
        >
          <Typography
            gutterBottom
            style={{ height: "inherit" }}
            variant="h3"
            color="initial"
          >
            What can I do with SpaceTiger?
          </Typography>
          <Typography variant="h6" color="initial" gutterBottom>
            <b style={{ fontWeight: 700 }}>Find a space. </b> Search through
            spots on campus for your next work session, club meeting, or
            rehearsal. Filter for whatever you need - type of room, amenity, or
            features.
            <br />
            <div style={{ height: "10px" }} />
            <b style={{ fontWeight: 700 }}>Leave a review. </b> Let others know
            what you think of a place you've visited. Upload pictures you've
            taken, rate based on various features, and add amenities we've
            missed. <br />
            <div style={{ height: "10px" }} />
            <b style={{ fontWeight: 700 }}>Create a space. </b> Can't find
            something? Add it to our list so others can discover it later.{" "}
            <br />
            <div style={{ height: "10px" }} />
            <b style={{ fontWeight: 700 }}>Rediscover your favorites. </b> Save
            the spaces you like by favoriting or leaving a review so you can
            find them later on your profile page.
            <br />
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        className={classes.block}
      >
        <Grid item container spacing={3} direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h3" color="initial">
              Meet the Team
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" spacing={3}>
            {members.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.name}>
                <MemberCard member={member} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
