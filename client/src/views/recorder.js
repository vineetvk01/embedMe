import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Videos } from '../components/Videos';
import { Grid, Form, Input, TextArea, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import VideoRecorder from 'react-video-recorder';

const MailContent = styled.div`
  margin: auto;
  text-align: center;
  overflow-y: scroll;
  border: 1px solid #d3d3d3;
  min-height: 80vh;
  background-color: #fff;
`;

const VideoContainer = styled.div`
  width: 60%;
  margin: auto;
  border: 1px hidden;
  border-radius: 30px;
  overflow: hidden;
  
`;

const Welcome = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

const MailDetails = ({ title, setTitle, message, setMessage }) => (
  <Form>

    <Button>
      <Icon name='upload' /> Upload your logo
    </Button> No File uploaded now!
    <br />
    <br />
    <Form.Field
      id=''
      control={Input}
      label='Title'
      value={title}
      placeholder='Title goes here'
      onChange={(e) => { setTitle(e.target.value) }}
    />
    <Form.Field
      id='form-textarea-control-opinion'
      control={TextArea}
      label='Message'
      value={message}
      placeholder='Message goes here'
      onChange={(e) => { setMessage(e.target.value) }}
    />
  </Form>
)

const LoadingView = () => <Welcome>Hey! Shine and Smile...</Welcome>

export const Recorder = () => {

  const [title, setTitle] = useState('Title goes here...');
  const [message, setMessage] = useState('Here goes the message that you want to send to anyone with the video');

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <MailDetails
            title={title} setTitle={useCallback(setTitle)}
            message={message} setMessage={useCallback(setMessage)}
          />
          <br />
          <Button primary>
            <Icon name='share square' /> Share Video
          </Button>
        </Grid.Column>
        <Grid.Column width={10}>
          <MailContent>
            <img src={process.env.PUBLIC_URL + '/images/embedMe.png'} />
            <h5>{title}</h5>
            <VideoContainer >
              <VideoRecorder timeLimit={10000} renderDisconnectedView={() => <LoadingView />} onRecordingComplete={(videoBlob) => { console.log('videoBlob', videoBlob) }} />
            </VideoContainer>
            <p>{message}</p>
          </MailContent>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )


}