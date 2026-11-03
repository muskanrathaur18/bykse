import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export const Button = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'danger':
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 8, paddingHorizontal: 12, minHeight: 36 };
      case 'lg':
        return { paddingVertical: 16, paddingHorizontal: 24, minHeight: 54 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 18, minHeight: 48 };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        getContainerStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#1E293B' : '#FFFFFF'}
        />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.iconMarginRight}>{leftIcon}</View>}
          <Text style={[styles.baseText, getTextStyle(), textStyle]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.iconMarginLeft}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: '700',
    fontSize: 15,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: COLORS.text,
  },
  dangerText: {
    color: '#FFFFFF',
  },
  iconMarginRight: {
    marginRight: SPACING.sm,
  },
  iconMarginLeft: {
    marginLeft: SPACING.sm,
  },
});
