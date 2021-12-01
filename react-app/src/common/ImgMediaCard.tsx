import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import bookshelf from '../assets/images/bookshelf.png';

const ImgMediaCard = () => {
  return (
    <Card sx={{ maxWidth: { xs: 500, md: 345 } }}>
      <CardMedia component="img" alt="green iguana" height="140" image={bookshelf} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Religion Bookshelf
        </Typography>
        <Typography variant="body2" color="text.primary">
          A curated library of mankind's holy scriptures embedded in an exotic carved block of wood to form one level.
          Features the Tao Te Ching, Analects of Confucious, The Torah, The Discourses of the Buddha, The Qu'ran, The
          Bible and The Bhagavad Gita.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ImgMediaCard;
