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
  SelectChangeEvent,
  TextareaAutosize,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useState, FC, useContext } from 'react';
import { ICampaign } from '../../interfaces';
import { AuthContext } from '../../context/AuthContext';
import { postFundraiser } from '../../services/fundraiserService';
import { useNavigate } from 'react-router';

const CreateCampaignController: FC = () => {
  let user = useContext(AuthContext);
  let navigate = useNavigate();

  type DataUnion = string | Blob;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<DataUnion>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [textEditor, setTextEditor] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('Art');
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleAmount = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    let amount = parseInt(event.target.value);
    if (!isNaN(amount)) {
      setGoalAmount(amount);
    } else setGoalAmount(0);
  };

  const handleTextEditor = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    let story = event.target.value;
    setTextEditor(story);
  };

  const handleCategory = (event: SelectChangeEvent<unknown>) => {
    const category = event.target.value as string;
    console.log(category);
    setCategory(category);
  };

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let title = data.get('title') as string;

    if (user !== null) {
      let requestObject: ICampaign = {
        title,
        story: textEditor,
        image_url: imgUrl,
        category,
        goal_amount: goalAmount,
        current_amount: 0,
        owner: user.uid,
      };
      try {
        console.log(requestObject);
        setButtonLoading(true);
        let { data } = await postFundraiser(requestObject);
        setTimeout(() => {
          let campaign = '/campaign/' + data._id;
          navigate(campaign);
        }, 200);
      } catch (ex: any) {
        console.log(ex.message);
        setButtonLoading(false);
      }
    }
  };

  const setFile = async (e: any) => {
    let image = e.target.files[0];
    setImage(image);
    await uploadImage(image);
  };

  const cloudinary = {
    url: process.env.REACT_APP_CLOUDINARY_UPLOAD_URL as RequestInfo,
    cloud: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as DataUnion,
    preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as DataUnion,
  };

  const uploadImage = (image: any): void => {
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

export default CreateCampaignController;
