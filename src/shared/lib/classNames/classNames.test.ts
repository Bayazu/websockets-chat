import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('red')).toBe('red');
    });
    test('with additional class', () => {
        expect(classNames('red', {}, ['class1', 'class2'])).toBe('red class1 class2');
    });
    test('with mods', () => {
        expect(classNames('red', { hovered: true, scrollable: false, dark: true })).toBe('red hovered dark');
    });
    test('with all', () => {
        expect(classNames(
            'red',
            { hovered: true, scrollable: false, dark: true },
            ['class1', 'class2'],
        )).toBe('red class1 class2 hovered dark');
    });
    test('with undefined', () => {
        expect(classNames(
            'red',
            {
                hovered: true, scrollable: false, dark: undefined,
            },
            ['class1', 'class2'],
        )).toBe('red class1 class2 hovered');
    });
});
