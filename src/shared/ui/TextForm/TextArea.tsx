import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    ChangeEvent,
    TextareaHTMLAttributes,
    memo, useEffect, useRef, useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import cls from './TextArea.module.scss';

type HTMLInputProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}
export const TextArea = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autofocus,
        ...otherProps
    } = props;
    const ref = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCaretPosition(e.target.selectionStart);
    };

    // todo поправить каррет
    // 1. получать текущую длинну текста из carretPosition
    // 2. если больше чем cols(160), то добавлять новую row
    // 3. при добавлении row добавлять top в класс карет

    return (
        <div className={classNames(cls.TextArea, {}, [className])}>
            <div className={cls.caretWrapper}>
                <TextareaAutosize
                    ref={ref}
                    className={cls.input}
                    minRows={1}
                    cols={150}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    onChange={onChangeHandler}
                    placeholder="Напишите сообщение..."
                    value={value}
                />

                {isFocused && (
                    <span
                        className={cls.caret}
                        style={{ left: `${caretPosition * 8.8}px` }}
                    />
                )}
            </div>
        </div>
    );
});
