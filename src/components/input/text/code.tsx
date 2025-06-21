import type { CSSProperties } from 'react';
import { html } from '@codemirror/lang-html';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { FormLabelProps } from '@mui/material/FormLabel';
import type { FormControlProps } from '@mui/material/FormControl';
import type { ScrollbarProps } from '@/components/scrollbar';
import { Scrollbar } from '@/components/scrollbar';
import ReactCodeMirror, { EditorView } from '@uiw/react-codemirror';
import { awesomeLineWrappingPlugin } from './plugins/awesome-line-wrapping-plugin';

interface Props {
  error?: string;
  helperText?: React.ReactNode;
  value: string;
  title?: string;
  onChange: (value: string) => void;
  slotProps?: {
    control?: FormControlProps;
    title?: FormLabelProps;
    helperText?: FormHelperTextProps;
    scrollBar?: ScrollbarProps;
    code?: CSSProperties;
  };
}

export function XCode({ slotProps, helperText, title, value, error, onChange }: Props) {
  // const { colorScheme } = useSettingsContext();

  const extensions = [html(), EditorView.lineWrapping, awesomeLineWrappingPlugin];

  return (
    <FormControl
      sx={{ overflow: 'hidden', width: '100%', ...slotProps?.control?.sx }}
      {...slotProps?.control}>
      {title && (
        <FormLabel component="legend" {...slotProps?.title}>
          {title}
        </FormLabel>
      )}

      <Scrollbar
        slotProps={{ content: { height: '100%' } }}
        sx={{ height: '100%', ...slotProps?.scrollBar }}
        {...slotProps?.scrollBar}>
        <ReactCodeMirror
          value={value}
          // minHeight="400px"
          height="100%"
          // maxWidth="450px"
          // onBlur={(e) => {
          //   e.target.id = name;
          //   onBlur?.(e);
          // }}
          extensions={extensions}
          onChange={onChange}
          // ref={ref}
          style={{
            // border: error ? "1px red solid" : "unset"
            borderRadius: '8px',
            cursor: 'text',
            height: '100%',
            minHeight: '100%',
            ...slotProps?.code,
            // border: touched && error ? "1px solid red" : "1px solid rgba(145, 158, 171, 0.2)",
          }}
          // theme={colorScheme}
          theme="light"
        />
      </Scrollbar>

      {(!!error || helperText) && (
        <FormHelperText error={!!error} {...slotProps?.helperText}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
