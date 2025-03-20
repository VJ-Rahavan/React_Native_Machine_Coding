import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {trigger} from 'react-native-haptic-feedback';

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

const width = 120;
const pad = 4;
const round = width / 2 - pad;
const height = 60;
const position = width - (round + pad) - 5;

const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

const Switch = () => {
  const shareValue = useSharedValue(0);

  const anime = useAnimatedStyle(() => {
    return {
      transform: [{translateX: shareValue.value}],
    };
  });

  const roundBg = useDerivedValue(() => {
    return interpolateColor(
      shareValue.value,
      [0, position],
      ['#E4E4ee', '#FFF'],
    );
  });

  const bgColor = useDerivedValue(() => {
    return interpolateColor(
      shareValue.value,
      [0, position],
      ['#F4F5F4', '#0F0'],
    );
  });

  const bgStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  });

  return (
    <View style={{flex: 1, padding: 20}}>
      <AnimatedTouch
        onPress={() => {
          trigger('impactLight', options);
          if (shareValue.value) {
            shareValue.value = withTiming(0, {
              easing: Easing.bezier(0.4, 0.75, 0.85, 1),
            });
          } else shareValue.value = withTiming(position);
        }}
        activeOpacity={0.8}
        style={[
          {
            width,
            height,
            borderRadius: 50,
            paddingHorizontal: 5,
            justifyContent: 'center',
          },
          bgStyles,
        ]}>
        <Animated.View
          style={[
            {
              width: round,
              height: height - 5,
              backgroundColor: roundBg,
              borderRadius: 50,
            },
            anime,
          ]}></Animated.View>
      </AnimatedTouch>
    </View>
  );
};

export default Switch;
