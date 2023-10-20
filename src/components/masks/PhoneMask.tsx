/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MaskedInput from 'react-text-mask';

export const PhoneMask = (props: any) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(inputRef) => {
        console.log('inputRef', inputRef);
        // if (inputRef) {
        //   inputRef = inputRef.inputElement;
        // }
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      showMask
    />
  );
};
