/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState, type PropsWithChildren} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import PhotoEditor from 'react-native-photo-editor';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

type ImageAsset = {
  fileName: string;
  fileSize: number;
  type: string;
  height: number;
  width: number;
  uri: string;
};

const App = () => {
  const [imagePickerReponse, setImagePickerResponse] = useState<any>(null);
  const onButtonPress = useCallback(() => {
    console.log('onCallback');
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 0,
      },
      setImagePickerResponse,
    );
  }, []);

  console.log('App');

  console.log('response', imagePickerReponse);
  const handleImagePress = (path: string) => () => {
    PhotoEditor.Edit({
      path,
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={{borderWidth: 1, borderRadius: 5}}>
          <Button
            onPress={() => onButtonPress()}
            title="Choose Image"
            color={'black'}
          />
        </TouchableOpacity>
        {imagePickerReponse?.assets?.length > 0 ? (
          imagePickerReponse.assets.map((item: ImageAsset, idx: number) => (
            <TouchableOpacity onPress={handleImagePress(item.uri)} key={idx}>
              <Image
                source={{uri: item.uri}}
                style={{height: 100, width: 100, marginTop: 10}}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No Image Chosen</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const AppDeprecated = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
