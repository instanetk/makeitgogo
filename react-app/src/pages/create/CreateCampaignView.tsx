import {
  Card,
  CardMedia,
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  TextareaAutosize,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { FC } from 'react';
import { ICreateCampaignProps } from '../../interfaces';

const CreateCampaignView: FC<ICreateCampaignProps> = ({
  handleSubmit,
  textEditor,
  handleTextEditor,
  setFile,
  imgUrl,
  category,
  handleCategory,
  handleAmount,
  goalAmount,
  buttonLoading,
}) => {
  return (
    <Box>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={3} sx={{ backgroundColor: 'grey.200', display: { xs: 'none', md: 'block' } }}></Grid>
        <Grid item xs={12} md={9} sx={{ backgroundColor: 'white' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box>
              <Typography variant="h1" fontSize="2rem" fontWeight="medium" color="text.primary" gutterBottom>
                Start a new campaign
              </Typography>
              <Typography variant="body1" fontSize="1rem" color="text.primary">
                Make a good first impression: introduce your campaign objectives and entice people to learn more. This
                basic information will represent your campaign on your campaign page, on your campaign card, and in
                searches.
              </Typography>
            </Box>
            <Box mt={4}>
              <Box mt={2}>
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold">
                  Campaing Title
                </Typography>
                <Typography variant="body1" color="grey.400" gutterBottom>
                  Make us believe in 30 words or less!
                </Typography>
                <TextField
                  tabIndex={1}
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Campaign Title"
                  name="title"
                  autoComplete="title"
                  sx={{ fontSize: '2rem' }}
                />
              </Box>
              <Box mt={6}>
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold">
                  Tell Your Story
                </Typography>
                <TextareaAutosize
                  aria-label="Tell Your Story: text area"
                  placeholder="Start writing..."
                  style={{ width: '100%', height: '250px', border: '1px solid grey', marginTop: '10px' }}
                  id="story"
                  value={textEditor}
                  onChange={handleTextEditor}
                />
              </Box>
              <Box mt={10}>
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold">
                  Campaign Card Image
                </Typography>
                <Typography variant="body1" color="grey.400" gutterBottom>
                  Click the area to upload an image that represents your campaign
                </Typography>
                <input type="file" onChange={(e) => setFile(e)} />
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'grey.300',
                    height: '300px',
                  }}>
                  {imgUrl && <CardMedia component="img" height="300" image={imgUrl} sx={{ objectFit: 'scale-down' }} />}

                  {!imgUrl && <ImageIcon sx={{ height: '150px', width: 'auto', color: 'grey.100' }} />}
                </Card>
              </Box>
              <Box mt={8}>
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold">
                  Category
                </Typography>
                <Typography variant="body1" color="grey.400" mb={4}>
                  To help backers find your campaign, select a category that best represents your project.
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="label">Category</InputLabel>
                  <Select
                    labelId="label"
                    id="category"
                    value={category}
                    label="Category"
                    sx={{ width: '100%' }}
                    onChange={handleCategory}>
                    <MenuItem value={'Art'}>Art</MenuItem>
                    <MenuItem value={'Education'}>Education</MenuItem>
                    <MenuItem value={'Film'}>Film</MenuItem>
                    <MenuItem value={'Fashion'}>Fashion</MenuItem>
                    <MenuItem value={'Music'}>Music</MenuItem>
                    <MenuItem value={'Tech'}>Tech</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={8}>
                <Typography variant="h2" fontSize="1.2rem" fontWeight="bold">
                  Campaign Goal Amount
                </Typography>
                <Typography variant="body1" color="grey.400" mb={4}>
                  How much money would you like to raise for this campaign?
                </Typography>
                <FormControl fullWidth>
                  <InputLabel htmlFor="goal_amount">In U.S. Dollars</InputLabel>
                  <OutlinedInput
                    id="goal_amount"
                    placeholder="500"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    endAdornment={<InputAdornment position="end">USD</InputAdornment>}
                    label="goal_amount"
                    sx={{ width: '100%' }}
                    onChange={handleAmount}
                    value={goalAmount}
                    type="number"
                  />
                </FormControl>
              </Box>
              <Box mt={8}>
                <Button
                  type="submit"
                  disabled={buttonLoading}
                  variant="contained"
                  color="info"
                  sx={{ height: '4rem', width: '100%', fontSize: '1.7rem' }}>
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateCampaignView;
