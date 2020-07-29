/* eslint-disable react/prop-types */
import React from 'react';

import {
  Button,
  Pane,
  Avatar,
  Heading,
  Icon,
  Text,
  majorScale,
  minorScale,
} from 'evergreen-ui';

export default function Profile({ currentUser }) {
  const { avatarUrl, name, login, location, blog, bio } = currentUser;
  return (
    <React.Fragment>
      <Pane
        float="left"
        backgroundColor="white"
        width="25%"
        display="flex"
        flexDirection="column"
        border="none"
      >
        <Avatar
          width="100%"
          height={majorScale(28)}
          borderRadius="50%"
          src={avatarUrl}
        />
        <Pane
          marginTop={majorScale(2)}
          marginBottom={majorScale(1)}
          display="flex"
          flexDirection="column"
          borderBottom="muted"
          paddingBottom={majorScale(3)}
        >
          <Heading size={800}>{name}</Heading>
          <Text size={500}>{login}</Text>
          <Button marginTop={majorScale(2)} appearance="default">
            Follow
          </Button>
        </Pane>
        <Pane
          display="flex"
          marginTop={minorScale(2)}
          flexDirection="column"
        >
          <Text size={300}>{bio}</Text>
          <Text
            size={300}
            marginBottom={majorScale(1)}
            marginTop={majorScale(2)}
            marginRight={minorScale(4)}
          >
            <Icon
              icon="git-repo"
              marginRight={minorScale(1)}
              size={minorScale(3)}
            ></Icon>
            Github
          </Text>
          <Text
            size={300}
            marginBottom={majorScale(1)}
            marginRight={minorScale(4)}
          >
            <Icon
              icon="geolocation"
              marginRight={minorScale(1)}
              size={minorScale(3)}
            ></Icon>
            {location}
          </Text>
          <Text size={300} marginRight={minorScale(4)}>
            <Icon
              icon="link"
              marginRight={minorScale(1)}
              size={minorScale(3)}
            ></Icon>
            {blog}
          </Text>
        </Pane>
      </Pane>
    </React.Fragment>
  );
}
