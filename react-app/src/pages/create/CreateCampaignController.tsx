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
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import MUIRichTextEditor from 'mui-rte';
import { useState, FC } from 'react';

const CreateCampaignController: FC = () => {
  type DataUnion = string | Blob;

  const [image, setImage] = useState<DataUnion>('');
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const [textEditor, setTextEditor] = useState();

  const save = (data: any) => {
    setTextEditor(data);
  };
  const setFile = async (e: any) => {
    let image = e.target.files[0];
    setImage(image);
    console.log('setFile', image);
    await uploadImage(image);
  };

  const cloudinary = {
    url: process.env.REACT_APP_CLOUDINARY_UPLOAD_URL as RequestInfo,
    cloud: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as DataUnion,
    preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as DataUnion,
  };

  const uploadImage = (image: any) => {
    const uploadData = new FormData();
    uploadData.append('file', image);
    uploadData.append('upload_preset', cloudinary.preset);
    uploadData.append('cloud_name', cloudinary.cloud);
    uploadData.append('tags', cloudinary.preset);
    fetch(cloudinary.url, {
      method: 'post',
      body: uploadData,
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        setImgUrl(data.secure_url);
        // console.log('image uploaded', imgUrl);
      })
      .catch((err) => console.log(err));
    setImage('');
  };

  return (
    <Box>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={3} sx={{ backgroundColor: 'grey.200', display: { xs: 'none', md: 'block' } }}></Grid>
        <Grid item xs={12} md={9} sx={{ backgroundColor: 'white' }}>
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
          <Box component="form" mt={4}>
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
              <MUIRichTextEditor
                label="Start typing..."
                onSave={save}
                controls={[
                  'title',
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  'highlight',
                  'undo',
                  'redo',
                  'link',
                  'numberList',
                  'bulletList',
                  'quote',
                  'code',
                  'save',
                ]}
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
                <Select labelId="label" id="category" value="Art" label="Category" sx={{ width: '100%' }}>
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
                <InputLabel htmlFor="outlined-adornment-amount">In U.S. Dollars</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value="500"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  endAdornment={<InputAdornment position="end">USD</InputAdornment>}
                  label="goal_amount"
                  sx={{ width: '100%' }}
                />
              </FormControl>
            </Box>
            <Box mt={8}>
              <Button variant="contained" color="info" sx={{ height: '4rem', width: '100%', fontSize: '1.7rem' }}>
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateCampaignController;
