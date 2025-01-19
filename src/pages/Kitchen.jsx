import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { BASE_URL } from '../context';
import NotificationComponent from '../components/Notification';
import '../scss/kitchen.scss'

export default function Kitchen() {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/kitchen-api-view',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        console.log(response.data, "dateaaa");

        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
        setLoading(false);
      });
  }, [])



  return (
    <>
      {/* <NotificationComponent /> */}
      <div className="kitchen-card">
        <div className='kitchen-container'>
          {
            data && data.map((item, i) =>
              <div className='card-div' key={item.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        <img src={BASE_URL + item.logo_or_image} />
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.kitchen_name}
                    subheader="September 14, 2016"
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    style={{
                      width: "90%", margin: "auto"
                    }}
                    image={BASE_URL + item.kitchen_photo}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>

                </Card>
              </div>

            )
          }
        </div>
      </div>
    </>
  );
}
