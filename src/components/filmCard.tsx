import React, { FunctionComponent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import { RatingComp } from './ratingComp';

type AppProps = {
  liked?: boolean
  id: number
  name: string
  date: string
  textOverview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  totalLikes: number
  vote_count: number
  onClickLike: (id: number) => void
  onClickShare: (id: number) => void
  onClickDelete: (id: number) => void
}
export const FilmCard: FunctionComponent<AppProps> = ({
  liked,
  id,
  name,
  date,
  textOverview,
  poster_path,
  backdrop_path,
  vote_average,
  totalLikes,
  vote_count,
  onClickLike,
  onClickShare,
  onClickDelete,
}: AppProps) => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        minWidth: 330,
        maxWidth: 345,
        maxHeight: 545,
        overflowY: "scroll",
        backgroundColor: "#EEEFF2",
        marginRight: 10,
        marginLeft: 10,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
    }),
  );
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton 
            aria-label="settings" 
            onClick={() => {
              liked ? onClickLike(id) : onClickDelete(id);
            }}
          >
            <CloseIcon />
          </IconButton>
        }
        title={name}
        subheader={date}
      />
      <CardMedia
        className={classes.media}
        image={`https://image.tmdb.org/t/p/original/${poster_path ? poster_path : backdrop_path}`}
        title={name}
      />
      <CardContent>
        {textOverview ? 
        (
        <Typography variant="body2" className="text" component="p">
          {textOverview}
        </Typography>
        )
        : 
        (
          <RatingComp vote_average={vote_average} vote_count={vote_count} />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Badge badgeContent={Math.round(totalLikes)} max={999} className="text">
          <IconButton 
            aria-label="add to favorites" 
            color={liked ? "secondary" : "default"}
            onClick={() => {
              onClickLike(id)
            }}
          >
            <FavoriteIcon className="colorAction" />
          </IconButton>
        </Badge>
        <IconButton 
          aria-label="share" 
          onClick={() => {
              onClickShare(id)
          }}
        >
          <ShareIcon />
        </IconButton>
        {textOverview && <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <RatingComp vote_average={vote_average} vote_count={vote_count} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
