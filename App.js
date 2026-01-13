import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

export default function App() {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  if (showVideo) {
    return (
      <View style={styles.container}>
        <Video
          source={require('./intro.mp4')}
          style={styles.video}
          resizeMode="cover"
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setShowVideo(false);
          }}
        />
      </View>
    );
  }

  return (
    <WebView 
      style={styles.container}
      source={{ uri: 'https://kitabk.lovable.app' }}
      allowsInlineMediaPlayback={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  video: { width: '100%', height: '100%' },
});
