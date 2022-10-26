import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  fakeNavBar: {
    height: "50px",
  },

  container: {
    minHeight: "80vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    padding: "30px",
  },

  searchbar: {
    width: "100%",
    marginBottom: "15px",
  },

  searchTextField: {
    width: "100%",
    maxWidth: "600px",
  },

  filters: {
    width: "100%",
    marginBottom: "30px",
    "& .MuiFormControl-root": {
      marginLeft: 0,
      marginRight: "15px",
      // width: "200px",
    },
  },

  spaceContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "1rem",
    justifyContent: "space-between",
    // margin: "30px",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "auto",
    },
    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.only("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },

  spaceItem: {
    // border: "1px solid #b8b8b8",
    // padding: "15px",
    // height: "250px",
    marginBottom: "2%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },

  spaceImg: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: "100%",
    height: "210px",
    bottom: 0,
  },

  spaceText: {
    border: "1px solid #b8b8b8",
    padding: "10px 15px 15px",
    "& h6": {
      fontWeight: 600,
    },
    "& p": {
      color: "#666",
      marginTop: "3px",
      marginBottom: "12px",
    },
  },
}));