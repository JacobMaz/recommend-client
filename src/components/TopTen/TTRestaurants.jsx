import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StampIcon from "../../assets/stampIcon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const TTRestaurants = (props) => {
  const classes = useStyles();

  const handleTopTen = () => {
    if (props.allFood !== null && props.allFood !== undefined) {
      let topTen = props.allFood
        .sort((a, b) => {
          return b.likes.length - a.likes.length;
        })
        .slice(0, 10)
        .map((restaurant, index) => (
          <div className={classes.root} id="topTenRestList" key={index}>
            <Accordion id="topTenStamps">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div id="handleSummery">
                  <Typography className={classes.heading}>
                    {props.handleString(restaurant.name)}
                  </Typography>
                  <div id='ttStamp'>
                    <img src={StampIcon} alt="Stamps:" id="ttStampIcon" />
                    <Typography>{restaurant.likes.length}</Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ));
      console.log("TOPTEN", topTen);
      return topTen;
    } else {
      console.log("allFood is null");
      return <></>;
    }
  };

  return (
    <>
      <div>
        <h3>Restaurants</h3>
      </div>
      {handleTopTen()}
    </>
  );
};

export default TTRestaurants;
