import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Icon} from 'expo';

interface Props {
  onPressHandler: () => void;
  disabled?: boolean;
  iconName: Icon<string>;
  iconSize: number;
  iconColor: string;
  text?: string;
  additionalStyles?: any;
}

const ControlsButton: React.FC<Props> = ({
  onPressHandler,
  disabled,
  iconName,
  iconSize,
  iconColor,
  text,
  additionalStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressHandler();
      }}
      disabled={disabled}
      style={[styles.button, additionalStyles]}>
      <MaterialIcons
        name={iconName}
        size={iconSize}
        style={styles.icon}
        color={iconColor}
      />
      {text && <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default ControlsButton;

const styles = StyleSheet.create({
  icon: {
    paddingRight: 0,
    paddingVertical: 0,
    alignSelf: 'center',
    zIndex: 2,
  },
  button: {
    flex: 0,
    flexDirection: 'column',
    alignSelf: 'center',
  },

  buttonText: {
    fontSize: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#3d3d3d',
    backgroundColor: 'rgba(136, 136, 136, 0.5)',
    padding: 5,
    borderRadius: 10,
  },
});
