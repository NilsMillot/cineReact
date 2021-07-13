import React, { FunctionComponent } from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';


type AppProps = {  
  vote_average: number
  vote_count: number
}
export const RatingComp: FunctionComponent<AppProps> = ({
  vote_average,
  vote_count,
}: AppProps) => {

  return (
    <>
      <Typography align="left" display="inline">Note: </Typography>
      <Typography align="right" display="inline">
        <Rating name="read-only" value={vote_average/2} precision={0.1} readOnly />
      </Typography>
      
      <Typography paragraph>
        Sur un total de {vote_count} votes.
      </Typography>
    </>
  );
}
