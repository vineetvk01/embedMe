import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const Video = styled.div`
  margin: 15px 0px;
  cursor: pointer;
`

const Title = styled.div`
  margin: 2px 0;
  font-size: 16px;
  font-weight: 600;
`

const Text = styled.p`
  margin: 0px 0;
  font-size: 14px;
  color: #666;
`;

const Author = styled.span`
  margin: 0px 0;
  font-size: 12px;
  color: #666;
`;

const Time = styled.span`
  margin: 0px 0;
  font-size: 12px;
  color: #666;
`;

const VideoEmbed = styled.img`
  border: 1px #000;
  border-radius: 5px;
`

const handleHoverIn = ({ currentTarget }) => {
  const gifUrl = String(currentTarget.src).split('.')[0] + '.gif';
  currentTarget.src = gifUrl;
}

const handleHoverOut = ({ currentTarget }) => {
  const pngUrl = String(currentTarget.src).split('.')[0] + '.png';
  currentTarget.src = pngUrl;
}

export const Videos = ({ name, text, location, imageURL, date }) => {

  return (
    <Video>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <VideoEmbed
              src={process.env.PUBLIC_URL + '/videos/sample.png'}
              onMouseOver={handleHoverIn}
              onMouseOut={handleHoverOut}
              width="100%"
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Title>Client Introduction Video</Title>
            <Author>by Vineet Srivastav</Author> , <Time>few minutes ago</Time>
          </Grid.Column>
          <Grid.Column width={2}>
            <Title>-</Title>
            <Author>Visits</Author>
          </Grid.Column>
          <Grid.Column width={2}>
            <Title>-</Title>
            <Author>Clicks</Author>
          </Grid.Column>
          <Grid.Column width={2}>
            <Title>-</Title>
            <Author>Plays</Author>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Video>
  )
}