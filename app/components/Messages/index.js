import { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeMsg } from '../../containers/message/actions';
import { Toast } from 'native-base';
import { Colors, Spacing, Typography, Mixins } from '../../styles';
import { MESSAGE_DURATION } from '../../utils/constants';

function Messages(props) {
  const { messages, removeMsg } = props;

  useEffect(() => {
    messages &&
      messages.map((msg, i) => {
        if (Toast.toastInstance && Toast.toastInstance._root)
          Toast.show({
            text: msg.message,
            duration: (msg.seconds?? MESSAGE_DURATION) * 1000,
            buttonText: 'X',
            buttonTextStyle: {
              fontFamily: Typography.FONT_FAMILY_SEMI_BOLD,
              lineHeight: Typography.LINE_HEIGHT_20,
              fontSize: Typography.FONT_SIZE_16,
              color: Colors.WHITE,
              marginTop: Spacing.SCALE_4,
            },
            textStyle: {
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              lineHeight: Typography.LINE_HEIGHT_20,
              fontSize: Typography.FONT_SIZE_16,
              color: Colors.WHITE,
            },
            style: {
              backgroundColor: msg.type === 'danger' ? '#e23636' : '#26a34c',
              paddingLeft: Spacing.SCALE_22,
              paddingRight: 0,
              height: Spacing.SCALE_80,
              alignItems: 'center',
              justifyContent: 'center',
            },
            onClose: () => removeMsg(i),
          });
        else Toast.hide();
      });
  }, [messages]);

  return null;
}
const mapStateToProps = state => {
  return {
    messages: state.messages,
  };
};

export default connect(
  mapStateToProps,
  { removeMsg },
)(Messages);
