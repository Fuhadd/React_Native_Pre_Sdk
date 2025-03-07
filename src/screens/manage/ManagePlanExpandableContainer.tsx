import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import HTML from 'react-native-render-html';
import { Dimensions } from 'react-native';
import { CustomColors } from '../../constants/CustomColors';
import { PolicyModel } from '../../models/PolicyModel';

interface ManagePlanExpandableContainerProps {
  title: string;
  subTitle: string;
  certificateUrl?: string;
  plan?: PolicyModel;
  isExpanded?: boolean;
}

const ManagePlanExpandableContainer: React.FC<ManagePlanExpandableContainerProps> = ({
  title,
  subTitle,
  certificateUrl,
  plan,
  isExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpand} style={styles.expandableContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <Path
            d={
              expanded
                ? 'M12 15.17L5.59 8.59 4.17 10l8 8 8-8-1.41-1.41L12 15.17z'
                : 'M12 8.83l6.41 6.41 1.41-1.41-8-8-8 8 1.41 1.41L12 8.83z'
            }
            fill={CustomColors.blackColor}
          />
        </Svg>
      </View>
      {expanded && (
        <View style={styles.expandedContent}>
          {certificateUrl ? (
            <View>
              <Text style={styles.textLabel}>Policy Document</Text>
              <TouchableOpacity onPress={() =>  null//launchURL(certificateUrl)

              }>
                <Text style={styles.downloadText}>Download Certificate</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView>
              <HTML source={{ html: subTitle }} contentWidth={Dimensions.get('window').width} />
            </ScrollView>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  expandableContainer: {
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'PhantomSans-SemiBold',
    // fontWeight: 'bold',
    color: CustomColors.blackColor,
  },
  expandedContent: {
    marginTop: 10,
  },
  textLabel: {
    fontSize: 14,
    color: CustomColors.backTextColor,
    fontWeight: '500',
  },
  downloadText: {
    fontSize: 14,
    color: CustomColors.greenTextColor,
    fontWeight: 'bold',
  },
});

export default ManagePlanExpandableContainer;
