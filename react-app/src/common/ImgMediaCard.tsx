import { Card, CardMedia, CardContent, Typography, CardActions, CardActionArea } from '@mui/material';
import Progress from './Progress';
import { FC } from 'react';
import { IMediaCardProps } from '../interfaces';

const ImgMediaCard: FC<IMediaCardProps> = ({ title, story, image, currentAmount, goalAmount, contributions }) => {
  return (
    <Card sx={{ maxWidth: { xs: 500, md: 345 }, height: '460px' }}>
      <CardActionArea>
        <CardMedia component="img" alt={title} height={160} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ height: '95px' }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            paragraph={true}
            sx={{ height: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {story}
          </Typography>
        </CardContent>
        <CardActions>
          <Progress currentAmount={currentAmount} goalAmount={goalAmount} contributions={contributions} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ImgMediaCard;
