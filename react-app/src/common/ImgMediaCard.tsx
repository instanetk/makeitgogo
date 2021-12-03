import { Card, CardMedia, CardContent, Typography, CardActions, CardActionArea } from '@mui/material';
import Progress from './Progress';
import { FC } from 'react';

interface IProps {
  title: string;
  story: string;
  image: string;
  currentAmount: number;
  goalAmount: number;
}

const ImgMediaCard: FC<IProps> = ({ title, story, image, currentAmount, goalAmount }) => {
  return (
    <Card sx={{ maxWidth: { xs: 500, md: 345 }, height: '460px' }}>
      <CardActionArea>
        <CardMedia component="img" alt={title} height={160} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            paragraph={true}
            sx={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
