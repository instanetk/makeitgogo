import { useState, FC, useContext } from 'react';
import { ICampaign } from '../../interfaces';
import { AuthContext } from '../../context/AuthContext';
import { postFundraiser } from '../../services/fundraiserService';
import CreateCampaignView from './CreateCampaignView';
import { SelectChangeEvent } from '@mui/material';

const CreateCampaignController: FC = () => {
  let user = useContext(AuthContext);

  type DataUnion = string | Blob;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<DataUnion>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [textEditor, setTextEditor] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('Art');
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleAmount = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    let amount = parseInt(event.target.value);
    if (!isNaN(amount)) {
      setGoalAmount(amount);
    } else setGoalAmount(null);
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
        email: user.email,
      };
      try {
        setButtonLoading(true);
        let response = await postFundraiser(requestObject);
        setTimeout(() => {
          let onboarding = response.headers['x-stripe-onboarding'];
          window.location.replace(onboarding);
        }, 400);
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
      })
      .catch((err) => console.log(err));
    setImage('');
  };

  return (
    <CreateCampaignView
      handleSubmit={handleSubmit}
      textEditor={textEditor}
      handleTextEditor={handleTextEditor}
      setFile={setFile}
      imgUrl={imgUrl}
      category={category}
      handleCategory={handleCategory}
      handleAmount={handleAmount}
      goalAmount={goalAmount}
      buttonLoading={buttonLoading}
    />
  );
};

export default CreateCampaignController;
