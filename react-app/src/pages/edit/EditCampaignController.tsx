import { useState, FC, useContext, useCallback, useEffect } from 'react';
import { ICampaign, ICampaignUpdate } from '../../interfaces';
import { AuthContext } from '../../context/AuthContext';
import EditCampaignView from './EditCampaignView';
import { SelectChangeEvent } from '@mui/material';
import { getFundraiserById, updateFundraiser, deleteFundraiser } from '../../services/fundraiserService';
import { useParams, useNavigate } from 'react-router';

const EditCampaignController: FC = () => {
  let navigate = useNavigate();
  const defaulState: ICampaign = {
    title: '',
    story: '',
    image_url: '',
    category: '',
    goal_amount: 1,
    current_amount: 0,
    published: false,
    owner: '',
    email: '',
    _id: '',
    date: new Date(),
  };
  const [campaign, setCampaign] = useState<ICampaign>(defaulState);

  const { id } = useParams<string>();

  const fetchData = useCallback(async () => {
    try {
      if (id !== undefined) {
        let { data } = await getFundraiserById(id);
        setCampaign(data);
      }
    } catch (ex: any) {
      console.log(ex.message);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // set initial states
    setTitle(campaign.title);
    setTextEditor(campaign.story);
    setImgUrl(campaign.image_url);
    setCategory(campaign.category);
    setGoalAmount(campaign.goal_amount);
  }, [campaign.title, campaign.story, campaign.image_url, campaign.category, campaign.goal_amount]);

  let user = useContext(AuthContext);

  type DataUnion = string | Blob;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<DataUnion>('');
  const [title, setTitle] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [textEditor, setTextEditor] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<number | null>(0);
  const [category, setCategory] = useState<string>('Art');
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    let title = event.target.value;
    setTitle(title);
  };

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
    setCategory(category);
  };

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let title = data.get('title') as string;

    if (user !== null) {
      let requestObject: ICampaignUpdate = {
        title,
        story: textEditor,
        image_url: imgUrl,
        category,
        goal_amount: goalAmount,
      };
      try {
        setButtonLoading(true);

        if (id !== undefined) await updateFundraiser(id, requestObject);
        setTimeout(() => {
          let campaign = '/campaign/' + id;
          navigate(campaign);
        }, 200);
      } catch (ex: any) {
        console.log(ex.message);
        setButtonLoading(false);
      }
    }
  };

  const handleDelete = async (event: any): Promise<void> => {
    try {
      setButtonLoading(true);

      if (id !== undefined) await deleteFundraiser(id);
      navigate('/');
    } catch (ex: any) {}
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
    <EditCampaignView
      campaign={campaign}
      handleTitle={handleTitle}
      title={title}
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
      handleDelete={handleDelete}
    />
  );
};

export default EditCampaignController;
