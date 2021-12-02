import { Card, CardMedia, CardContent, Typography, CardActions, CardActionArea } from '@mui/material';
import bookshelf from '../assets/images/bookshelf.png';
import Progress from './Progress';
import { FC } from 'react';

interface IProps {
  title: string;
  story: string;
  currentAmount: number;
  goalAmount: number;
}

const ImgMediaCard: FC<IProps> = ({ title, story, currentAmount, goalAmount }) => {
  return (
    <Card sx={{ maxWidth: { xs: 500, md: 345 } }}>
      <CardActionArea>
        <CardMedia component="img" alt={title} height="140" image={bookshelf} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {story}
          </Typography>
        </CardContent>
        <CardActions>
          <Progress currentAmount={currentAmount} goalAmount={goalAmount} backers={89} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ImgMediaCard;
