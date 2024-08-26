import React, { useState, forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExtraInputProps {
  label?: string;
  borderLess?: boolean;
  isTextBox?: boolean;
  isPassword?: boolean;
  error?: string | null;
  isTitle?: boolean;
  isRequired?: boolean;
}

const Input = forwardRef(function MyInput(
  props: ExtraInputProps & TextInputProps,
  ref: React.Ref<TextInput>
) {
  const {
    label,
    borderLess,
    isTextBox,
    isPassword,
    error,
    isTitle,
    editable = true,
    isRequired = false,
    ...otherProps
  } = props;
  const [show, setShow] = useState(false);
  return (
    <View>
      {label ? (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={styles.label}>{label}</Text>
          {isRequired ? (
            <View style={{ marginLeft: 5, marginTop: 5 }}>
              <Image
                source={require('@/assets/icons/required.png')}
                style={{ width: 8, height: 8 }}
              />
            </View>
          ) : null}
        </View>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          borderLess ? styles.borderNone : null,
          !editable ? { opacity: 0.7 } : null,
        ]}>
        <View style={styles.innerView}>
          <TextInput
            ref={ref}
            {...otherProps}
            style={[
              styles.input,
              isTitle ? styles.titleText : null,
              isTextBox ? styles.textBox : null,
            ]}
            secureTextEntry={isPassword && !show}
            autoCorrect={false}
            autoComplete={'off'}
            selectTextOnFocus={false}
            autoCapitalize="none"
            spellCheck={false}
            placeholderTextColor={'#999999'}
            selectionColor="#fdfdfd"
            cursorColor="#fff"
            editable={editable}
          />
          {isPassword ? (
            <TouchableOpacity onPress={() => setShow(state => !state)}>
              {show ? (
                <Ionicons style={styles.inputIconPassword} name="eye" color={'#FFF'} size={18} />
              ) : (
                <Ionicons
                  style={styles.inputIconPassword}
                  name="eye-off"
                  color={'#FFF'}
                  size={18}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: '#F2F2F2',
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 0,
  },
  textBox: {
    height: 130,
    paddingVertical: Platform.OS === 'android' ? 12 : 16,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: Platform.OS === 'android' ? 10 : 16,
    fontSize: 16,
    fontFamily: 'Inter-300',
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#c7c7c7',
    marginBottom: 6,
    fontFamily: 'Inter-400',
  },
  error: {
    fontSize: 12,
    color: '#f02d3a',
    bottom: 0,
    position: 'absolute',
    marginBottom: -20,
    fontFamily: 'Inter-300',
    letterSpacing: 0.5,
  },
  inputIconPassword: {
    height: 20,
    width: 20,
    marginRight: 12,
  },
  borderNone: {
    borderWidth: 0,
    backgroundColor: '#1C1C29',
  },
  titleText: {
    fontSize: 15,
    fontFamily: 'Inter-500',
  },
});
