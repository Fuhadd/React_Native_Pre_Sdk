import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import HTML from 'react-native-render-html'; // For HTML rendering
import {CustomColors} from '../constants/CustomColors';
import BackIcon from '../assets/icons/chevron_left.svg';

interface ExpandableContainerProps {
  title: string;
  subTitle: string;
}

const ExpandableContainer: React.FC<ExpandableContainerProps> = ({
  title,
  subTitle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContainer = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleContainer} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Animated.View
            style={{transform: [{rotate: isExpanded ? '180deg' : '0deg'}]}}>
            <BackIcon width={25} height={25} />
            {/* <SvgUri
            width="24"
            height="24"
            uri="https://example.com/chevron-down-icon.svg" // replace with actual path or icon
          />/ */}
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          <HTML
            source={{html: subTitle}}
            contentWidth={Dimensions.get('window').width}
          />
          {/* <Text style={styles.subTitle}>{subTitle}</Text> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 8,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: CustomColors.blackColor,
    fontWeight: '600',
  },
  content: {
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: CustomColors.greyTextColor,
  },
});

// export default ExpandableContainer;
