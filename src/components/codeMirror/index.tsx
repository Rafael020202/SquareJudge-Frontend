import React from 'react';
import {UnControlled} from 'react-codemirror2'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

interface Props {
    value: string;
    handleChange?: (editor, data, value) => void;
    readonly?: boolean;
}

const CodeMirror: React.FC<Props> = ({value, handleChange, readonly = false}) => {
    return(
        <UnControlled
            value={value}
            options={{
                mode: 'text/x-csrc',
                theme: 'dracula',
                lineNumbers: true,
                viewportMargin: Infinity,
                readOnly: readonly
            }}
            onChange={handleChange}
            autoCursor={false}
        />
    );
}

export default CodeMirror;