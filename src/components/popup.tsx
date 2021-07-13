import React, { FunctionComponent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },
    link: {
      marginTop: '20px',
    },
    image: {
      margin: '0 auto',
    },
  }),
);

type AppProps = {
  title: string
  image: string
  openPopup: boolean
  setOpenPopup: CallableFunction
}

export const PopupModal: FunctionComponent<AppProps> = ({
  title,
  image,
  openPopup,
  setOpenPopup,
}: AppProps) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPopup}>
          <Box display="flex" flexDirection="column" className={classes.paper}>
            <h2 id="transition-modal-title">Partages {title} à tes proches</h2>
            {image && <img src={`https://image.tmdb.org/t/p/original/${image}`} width="360px" height="200px" className={classes.image} alt={title} />}
            
            <Link href={`https://www.google.com/search?q=${title}`} className={classes.link}>
              https://www.google.com/search?q={title}
            </Link>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}


